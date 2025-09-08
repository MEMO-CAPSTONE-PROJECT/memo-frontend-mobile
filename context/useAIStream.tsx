import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// Define message types
interface BotMessage {
    id: string;
    text: string;
    status: "loading" | "streaming" | "complete" | "error";
}

// Define context type
interface StreamContextType {
    messages: BotMessage[];
    messagesMap: Map<string, { text: string, status: BotMessage["status"] }>;
    startStream: (id: string, message: string) => Promise<string | undefined>;
    refetchMessage: (id: string, message: string) => Promise<string | undefined>;
    getMessageById: (id: string) => BotMessage | null;
    isMessageLoading: (id: string, isLoadingPrompt?: boolean) => boolean;
    isMessageStreaming: (id: string) => boolean;
    isMessageError: (id: string) => boolean;
    clearMessages: () => void;
}

// Create context
const StreamContext = createContext<StreamContextType | undefined>(undefined);

// Timeout duration in milliseconds
const STREAM_TIMEOUT_MS = 4 * 60 * 1000; // 2 minutes
const RECONNECT_DELAY_MS = 1000; // 3 seconds
const WEBSOCKET_URL = "wss://capstone24.sit.kmutt.ac.th/sy1-socket/ws"

// Provider component
export const StreamProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [messages, setMessages] = useState<BotMessage[]>([]);
    const websocketsRef = useRef<Map<string, WebSocket>>(new Map());
    const messageBuffersRef = useRef<Map<string, string>>(new Map());
    const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
    const connectingRef = useRef<Set<string>>(new Set());
    const retryCountRef = useRef<Map<string, number>>(new Map());
    const creationTimesRef = useRef<Map<string, number>>(new Map()); // Track creation time
    const MAX_RETRIES = 3;

    // Clean up function to handle websocket closure
    const cleanupWebSocket = useCallback((id: string, status: "complete" | "error" = "complete") => {
        const websocket = websocketsRef.current.get(id);
        if (websocket) {
            if (websocket.readyState === WebSocket.OPEN || 
                websocket.readyState === WebSocket.CONNECTING) {
                websocket.close();
            }
            websocketsRef.current.delete(id);
            messageBuffersRef.current.delete(id);
        }
        
        if (timeoutsRef.current.has(id)) {
            clearTimeout(timeoutsRef.current.get(id)!);
            timeoutsRef.current.delete(id);
        }

        connectingRef.current.delete(id);
        retryCountRef.current.delete(id);
        creationTimesRef.current.delete(id);
        
        setMessages(prev => 
            prev.map(msg => 
                msg.id === id
                    ? { ...msg, status } 
                    : msg
            )
        );
    }, []);

    // Common streaming logic
    const createWebSocketStream = useCallback((id: string, message: string, updateExisting: boolean = false) => {
        if (!message.trim()) return;
        const existingMessage = messages.find(msg => msg.id === id);
        if (existingMessage && !updateExisting) {
            return Promise.resolve(id); // Return early if message exists and not forcing
        }
        const existingWs = websocketsRef.current.get(id);
        if (existingWs && existingWs.readyState === WebSocket.OPEN) {
            console.warn(`WebSocket ${id} already open, skipping new connection`);
            return Promise.resolve(id);
        }

        cleanupWebSocket(id);
        messageBuffersRef.current.set(id, "");
        retryCountRef.current.set(id, 0);
        creationTimesRef.current.set(id, Date.now());
        
        setMessages(prev => {
            const exists = prev.some(msg => msg.id === id);
            if (exists) {
                return prev.map(msg =>
                    msg.id === id ? { ...msg, text: "", status: "loading" } : msg
                );
            }
            return [...prev, { id, text: "", status: "loading" }];
        });

        connectingRef.current.add(id);
        
        const setupWebSocket = () => {
            const websocket = new WebSocket(WEBSOCKET_URL);
            websocketsRef.current.set(id, websocket);
            
            const timeout = setTimeout(() => {
                console.log(`Stream ${id} timed out after ${STREAM_TIMEOUT_MS}ms`);
                cleanupWebSocket(id, "error");
            }, STREAM_TIMEOUT_MS);  
            timeoutsRef.current.set(id, timeout);
            
            websocket.onopen = () => {
                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === id
                            ? { ...msg, status: "streaming" }
                            : msg
                    )
                );
                websocket.send(JSON.stringify({ message }));
            };

            websocket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    
                    if (data.type === "message") {
                        const currentBuffer = messageBuffersRef.current.get(id) || "";
                        const updatedBuffer = currentBuffer + (data.content || "");
                        messageBuffersRef.current.set(id, updatedBuffer);
                        
                        setMessages(prev => {
                            return prev.map(msg => 
                                msg.id === id 
                                    ? { ...msg, text: updatedBuffer, status: updatedBuffer ? "streaming" : "loading" } 
                                    : msg
                            );
                        });
                        if (data.content && timeoutsRef.current.has(id)) {
                            clearTimeout(timeoutsRef.current.get(id)!);
                            const newTimeout = setTimeout(() => {
                                console.log(`Stream ${id} timed out after inactivity`);
                                cleanupWebSocket(id, "error");
                            }, STREAM_TIMEOUT_MS);
                            timeoutsRef.current.set(id, newTimeout);
                        }
                    } else if (data.type === "done") {
                        if (timeoutsRef.current.has(id)) {
                            clearTimeout(timeoutsRef.current.get(id)!);
                            timeoutsRef.current.delete(id);
                        }
                        cleanupWebSocket(id, "complete");
                    } else if (data.type === "error") {
                        console.error("Server reported error:", data.content);
                        cleanupWebSocket(id, "error");
                    }
                } catch (error) {
                    console.error("Error parsing WebSocket data:", error);
                    cleanupWebSocket(id, "error");
                }
            };
            
            websocket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };
            
            websocket.onclose = (event) => {
                console.log(`WebSocket ${id} closed with code ${event.code}, Reason: ${event.reason}`);
                if (connectingRef.current.has(id)) {
                    const retryCount = retryCountRef.current.get(id) || 0;
                    
                    if (retryCount < MAX_RETRIES && event.code !== 1000) {
                        console.log(`Retrying connection (${retryCount + 1}/${MAX_RETRIES})...`);
                        retryCountRef.current.set(id, retryCount + 1);
                        
                        setTimeout(() => {
                            if (connectingRef.current.has(id)) {
                                setupWebSocket();
                            }
                        }, RECONNECT_DELAY_MS * Math.pow(2, retryCount));
                    } else {
                        cleanupWebSocket(id, "error");
                    }
                }
            };
        };
        
        setupWebSocket();
        return id;
    }, [cleanupWebSocket, messages]);

    // Start streaming response for a new message
    const startStream = useCallback(async (id: string, message: string) => {
        return createWebSocketStream(id, message, false);
    }, [createWebSocketStream]);

    // Refetch an existing message
    const refetchMessage = useCallback(async (id: string, message: string) => {
        return createWebSocketStream(id, message, true);
    }, [createWebSocketStream]);

    const getMessageById = useCallback((id: string) => {
        return messages.find(msg => msg.id === id) || null;
    }, [messages]);
    
    const isMessageLoading = useCallback((id: string, isLoadingPrompt = true) => {
        const message = getMessageById(id);
        return isLoadingPrompt || message?.status === "loading" || message?.text?.trim() === "";
    }, [getMessageById]);
    
    const isMessageStreaming = useCallback((id: string) => {
        const message = getMessageById(id);
        return message?.status === "streaming";
    }, [getMessageById]);

    const isMessageError = useCallback((id: string) => {
        const message = getMessageById(id);
        return message?.status === "error";
    }, [getMessageById]);
    
    const messagesMap = React.useMemo(() => {
        const map = new Map<string, { text: string, status: BotMessage["status"] }>();
        messages.forEach(msg => map.set(msg.id, { text: msg.text, status: msg.status }));
        return map;
    }, [messages]);
    
    const clearMessages = useCallback(() => {
        websocketsRef.current.forEach((websocket, id) => {
            if (websocket.readyState === WebSocket.OPEN || 
                websocket.readyState === WebSocket.CONNECTING) {
                websocket.close(1000, "Clearing messages");
            }
        });
        timeoutsRef.current.forEach((timeout) => {
            clearTimeout(timeout);
        });
        websocketsRef.current.clear();
        timeoutsRef.current.forEach(clearTimeout)
        timeoutsRef.current.clear();
        messageBuffersRef.current.clear();
        connectingRef.current.clear();
        retryCountRef.current.clear();
        setMessages([]);
    }, []);

    // Clean up stuck connections
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            websocketsRef.current.forEach((ws, id) => {
                const creationTime = creationTimesRef.current.get(id) || now;
                if ((ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.OPEN) &&
                    (now - creationTime > STREAM_TIMEOUT_MS * 1.5)) { // 50% longer than timeout
                    console.warn(`Cleaning up stuck WebSocket ${id}`);
                    cleanupWebSocket(id, "error");
                }
            });
        }, 10000); // Check every 10 seconds

        return () => clearInterval(interval);
    }, [cleanupWebSocket]);

    // Clean up on unmount
    useEffect(() => {
        return () => clearMessages();
    }, [clearMessages]);

    const value = {
        messages,
        messagesMap,
        startStream,
        refetchMessage,
        getMessageById,
        isMessageLoading,
        isMessageStreaming,
        isMessageError,
        clearMessages
    };

    return (
        <StreamContext.Provider value={value}>
            {children}
        </StreamContext.Provider>
    );
};

export const useStreamContext = () => {
    const context = useContext(StreamContext);
    if (context === undefined) {
        throw new Error('useStreamContext must be used within a StreamProvider');
    }
    return context;
};