import ScrollableView from "@/components/scrollable/scrollable-view"
import { BaseURL } from "@/shared/api-handler"
import { PaperPlaneRight } from "phosphor-react-native"
import { Fragment, useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import EventSource from "react-native-sse"
import { Spinner } from "tamagui"

interface ChatScreenProps {
    prod: boolean
}

interface Message {
    id: string;
    text: string;
    sender: "bot" | "user";
}

export default function ChatScreen({ prod }: Readonly<ChatScreenProps>) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Added isLoading state

    const startStream = async () => {
        if (!input.trim()) return;

        // Add user message to the state
        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: "user",
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true); // Set loading true when stream starts
        setIsStreaming(true);

        // Construct the API endpoint
        const baseUrl = prod ? BaseURL.replace("mobile/apis", "ai") : "http://cp24sy1memo.sit.kmutt.ac.th:8080";
        const api = baseUrl + `/chat?message=${encodeURIComponent(input)}`;
        const eventSource = new EventSource(api);

        let botMessageBuffer = ""; // Buffer to accumulate bot's message chunks

        eventSource.addEventListener("message", (event) => {
            if (!event.data) {
                console.log("Stream closed by server.");
                eventSource.close();
                setIsStreaming(false);
                setIsLoading(false); // Set loading false when stream ends
                return;
            }

            const data = JSON.parse(event.data);
            botMessageBuffer += data.bot_message; // Append the chunk to the buffer

            // Update the last bot message in the state or add a new one if it doesn't exist
            setMessages((prev) => {
                const lastMessage = prev[prev.length - 1];
                if (lastMessage && lastMessage.sender === "bot") {
                    // Update the existing bot message
                    const updatedMessages = [...prev];
                    updatedMessages[updatedMessages.length - 1] = {
                        ...lastMessage,
                        text: botMessageBuffer,
                    };
                    return updatedMessages;
                } else {
                    // Add a new bot message
                    return [
                        ...prev,
                        { id: Date.now().toString(), text: botMessageBuffer, sender: "bot" },
                    ];
                }
            });

            if (data.status === "done") {
                eventSource.close();
                setIsStreaming(false);
                setIsLoading(false); // Set loading false when stream completes
            }
        });

        eventSource.addEventListener("error", (error) => {
            console.error("SSE error:", error);
            eventSource.close();
            setIsStreaming(false);
            setIsLoading(false); // Set loading false on error
        });
    };

    return (
        <Fragment>
            <ScrollableView className="w-full flex-1" border={false}>
                {messages.map((message, index) => (
                    <View
                        className={`m-2 p-3 rounded-sm ${message.sender === "user"
                                ? "self-end bg-system-blue-2"
                                : "self-start bg-system-light-gray"
                            }`}
                        key={index}
                    >
                        <Text
                            className={`font-kanit-medium ${message.sender === "user" ? "text-system-white" : "text-system-black"
                                }`}
                        >
                            {message.text}
                        </Text>
                    </View>
                ))}
                {isLoading && (
                    <View className="m-2 p-3 rounded-sm self-start bg-system-light-gray">
                        <Spinner color="black" />
                    </View>
                )}
            </ScrollableView>

            {/* Input Area */}
            <View className="w-full flex-row justify-between">
                <TextInput
                    className="flex-1 px-lg border-xsm border-system-gray rounded-lg font-kanit-medium"
                    value={input}
                    onChangeText={setInput}
                    placeholder="คุณคิดอะไรอยู่..."
                    editable={!isStreaming}
                />
                <TouchableOpacity
                    className={`ml-3 p-3 rounded-circle ${isStreaming ? "bg-system-gray" : "bg-system-blue-2"
                        }`}
                    onPress={startStream} // Fixed: was calling 'stream' instead of 'startStream'
                    disabled={isStreaming}
                >
                    <PaperPlaneRight size={24} color="white" weight="fill" />
                </TouchableOpacity>
            </View>
        </Fragment>
    )
}