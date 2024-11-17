import { Color } from "@/constants/theme/color";
import { Warning } from "phosphor-react-native";
import { Text, View } from "react-native";

interface MemoErrorMessageProps {
    error?: string
    className?: string
}

export default function MemoErrorMessage({ error, className }: Readonly<MemoErrorMessageProps>) {
    if (!error) return <View></View>
    return (
        <View className={`flex-row items-center ${className}`}>
            <Warning size={16} weight="bold" color={Color["system-error"]}/>
            <Text className="font-kanit-regular text-system-error text-caption-1 ml-sm">{ error }</Text>
        </View>
    )
}