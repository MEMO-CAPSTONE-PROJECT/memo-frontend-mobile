import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

interface KeyboardViewProps {
    children: React.ReactNode
}

export default function KeyboardView({ children }: Readonly<KeyboardViewProps>) {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView
                keyboardShouldPersistTaps="never"
                keyboardDismissMode="interactive"
                scrollEnabled={false}
                contentContainerClassName="h-full w-screen"
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}