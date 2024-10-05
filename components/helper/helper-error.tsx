import { Color } from "@/constants/theme/color";
import { Warning } from "phosphor-react-native";
import { Text, View } from "react-native";

interface HelperErrorProps {
    error?: string
}

export default function HelperError({ error }: HelperErrorProps) {
    if (!error) return <View></View>
    return (
        <View className="flex-row justify-center items-center">
            <Warning size={16} weight="bold" color={Color["system-error"]}/>
            <Text className="font-kanit-regular text-system-error ml-[5px]">{ error }</Text>
        </View>
    )
}