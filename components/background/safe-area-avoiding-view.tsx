import { SafeAreaView, View } from "react-native";

interface SafeAreaAvoidingViewProps {
    children: React.ReactNode
}

export default function SafeAreaAvoidingView({ children }: Readonly<SafeAreaAvoidingViewProps>) {
    return (
        <View className={`flex-[1] overflow-hidden`}>
            <SafeAreaView className={`flex-[0]`} />
            <View className={`flex-[1] relative`} >
                {children}
            </View>
            <SafeAreaView className={`flex-[0]`} />
        </View>
    )
}