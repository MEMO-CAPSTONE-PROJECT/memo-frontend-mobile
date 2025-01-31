import { Platform, SafeAreaView, View } from "react-native";

interface SafeAreaAvoidingViewProps {
    children: React.ReactNode
}

export default function SafeAreaAvoidingView({ children }: Readonly<SafeAreaAvoidingViewProps>) {
    const flex = Platform.OS === "android" ? "flex-[0.03]" : "flex-[0]"
    const appbar = Platform.OS === "android" ? "pt-[80]" : ""
    return (
        <View className={`flex-[1] overflow-hidden`}>
            <SafeAreaView className={`${flex}`} />
            <View className={`flex-[1] relative ${appbar}`} >
                {children}
            </View>
            <SafeAreaView className={`${flex} `} />
        </View>
    )
}