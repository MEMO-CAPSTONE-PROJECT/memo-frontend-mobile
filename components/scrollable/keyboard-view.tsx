import { KeyboardAvoidingView, ScrollView } from "react-native";

interface KeyboardViewProps {
    padding?: boolean
    full?: boolean
    children: React.ReactNode
}

export default function KeyboardView({ children, padding = true, full = false }: Readonly<KeyboardViewProps>) {
    return (
        <KeyboardAvoidingView 
            behavior="position"
            style={{
            alignItems: 'center',
            }}
        >
            <ScrollView
                keyboardShouldPersistTaps="never"
                keyboardDismissMode="interactive"
                scrollEnabled={false}
                contentContainerClassName={`h-full ${full ? "w-full" : "w-screen"}`}
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}