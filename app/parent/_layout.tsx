import { useAuth } from "@/app/context/AuthContext";
import { Stack } from "expo-router";

export default function ParentRootLayout() {
    const { state } = useAuth()
    const isAuthenticated = state?.authenticated

    return (
        <Stack screenOptions={{ headerShown: false, }}>
            {isAuthenticated ? 
                <Stack.Screen name="(tabs)" /> : 
                (<>
                    <Stack.Screen name="login/(login)/index" />
                    <Stack.Screen name="login/(login)/otp" />
                    <Stack.Screen name="login/(login)/students" />
                </>)
            }
        </Stack>
    )
}