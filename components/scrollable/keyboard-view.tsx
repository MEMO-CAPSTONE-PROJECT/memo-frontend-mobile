import Constants from "expo-constants";
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView } from "react-native";

interface KeyboardViewProps {
    padding?: boolean
    children: React.ReactNode
}

export default function KeyboardView({ children, padding = true }: Readonly<KeyboardViewProps>) {
    return (
        <KeyboardAvoidingView 
            behavior="position"
            style={{
            height: Platform.OS === 'android' ? Dimensions.get('window').height -  Constants.statusBarHeight : '100%',
            alignItems: 'center',
            }}
        >
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