import { Color } from "@/constants/theme/color";
import { FontFamily } from "@/constants/theme/font";
import { Stack } from "expo-router";

export default function StudentRootLayout() {
    return (
            <Stack screenOptions={{
                headerShown: false,
                headerTransparent: true,
                headerTitleStyle: { fontFamily: FontFamily["kanit-bold"], color: Color["secondary-3"] }
            }}>
                <Stack.Screen name="(tabs)" />
            </Stack>
    )
}