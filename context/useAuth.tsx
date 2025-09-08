import { MemoKey } from "@/constants/key";
import api from "@/shared/api-handler";
import { MemoConfig } from "@/shared/config";
import StorageServiceInstance from "@/shared/services/storage-service";
import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext({
    state: {
        accessToken: null
    },
    isAuthenticated: false,
    login: async (url: string, body: {}) => false,
    logout: async () => {}
})

function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [state, setState] = useState({
        accessToken: null
    })

    async function login(url: string, body: any): Promise<boolean> {
        try {
            const result = MemoConfig.isMock ? { data: { data: { token: "FakeToken" } } } : await api.post(url, body)
            const { 
                data: { 
                    token: accessToken 
                } 
            } = result.data
            if (!accessToken) throw new Error("Login failed")
            setState({
                accessToken,
            })
            
            await StorageServiceInstance.setItem(MemoKey.JWT_ACCESS_TOKEN, accessToken)

            return true
        } catch (error) {
            console.log("[MEMO] Login failed", error)
            return false
        }
    }

    async function logout() {
        await StorageServiceInstance.deleteItem(MemoKey.JWT_ACCESS_TOKEN)
        setState({
            accessToken: null
        })
    }

    const isAuthenticated = StorageServiceInstance.getItem(MemoKey.JWT_ACCESS_TOKEN) !== null

    const value = useMemo(() => ({ state, login, logout, isAuthenticated }), [state, isAuthenticated])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}
export default function useAuth() {
    const authContext = useContext(AuthContext)
    return authContext
}

export { AuthContext, AuthProvider, useAuth };

