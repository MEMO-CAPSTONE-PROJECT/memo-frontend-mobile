import axios from "axios";
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import React, { createContext, useContext, useEffect } from "react";

interface AuthProps {
    state?: {
        token: string | null
        authenticated: boolean | null
    }
    login?: (email: string, password: string) => Promise<any>
    logout?: () => Promise<any>
}

const TOKEN_KEY = "jwt-token-key"
const AuthContext = createContext<AuthProps>({})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const API_URL = process.env.EXPO_PUBLIC_API_URL
    const [state, setState] = React.useState<AuthProps["state"]>({
        token: null,
        authenticated: null,
    })

    async function loadToken() {
        const token = await getItemAsync(TOKEN_KEY)
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            setState({
                token: token,
                authenticated: true,
            })
        }
    }
    useEffect(() => { loadToken() }, [])

    async function login(email: string, password: string) {
        try {
            // const result = await axios.post(`${API_URL}/auth`, { email, password })
            const result = { data: { token: "test-token" } }

            if (!result?.data?.token)  return { error: true, message: "กรุณาตรวจสอบอีเมลและรหัสผ่านอีกครั้ง" }
            setState({
                token: result.data.token,
                authenticated: true,
            })

            axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`
            await setItemAsync(TOKEN_KEY, result.data.token)

            return result
        } catch (error) {
            return { error: true, message: (error as any).response.data.error }
        }
    }

    async function logout() {
        await deleteItemAsync(TOKEN_KEY)
        axios.defaults.headers.common["Authorization"] = ""
        setState({
            token: null,
            authenticated: false,
        })
    }

    const value = {
        login: login,
        logout: logout,
        state: state,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}