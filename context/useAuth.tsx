import api from "@/shared/api-handler";
import { createContext, useContext, useState } from "react";
import * as Keychain from "react-native-keychain";

export const JWT_ACCESS_TOKEN_KEY = "jwt-access-token"

const AuthContext = createContext({
    state: {
        accessToken: null,
        authenticated: false
    },
    login: async (url: string, body: {}) => false,
    logout: () => {}
})

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState({
        accessToken: null,
        authenticated: false
    })

    async function login(url: string, body: any): Promise<boolean> {
        try {
            const result = await api.post(url, body)
            const { 
                data: { 
                    token: accessToken 
                } 
            } = result.data
            if (!accessToken) throw new Error("Login failed")
            setState({
                accessToken,
                authenticated: true
            })

            // await Keychain.setGenericPassword(JWT_ACCESS_TOKEN_KEY, accessToken)
            return true
        } catch (error) {
            console.log("[MEMO] Login failed", error)
            return false
        }
    }

    async function logout() {
        await Keychain.resetGenericPassword()
        setState({
            accessToken: null,
            authenticated: false
        })
    }

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

function useAuth() {
    const authContext = useContext(AuthContext)
    return authContext
}

export { AuthProvider, useAuth };
