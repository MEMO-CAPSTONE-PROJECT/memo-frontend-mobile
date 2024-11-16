
import { Color } from "@/constants/theme/color";
import { CaretRight, Icon } from "phosphor-react-native";
import { Text, View } from "react-native";

interface MemoNavigatorCardProps {
    title: string
    className: string
    Icon: Icon
}

export default function MemoNavigatorCard({
    title, className, Icon
}: Readonly<MemoNavigatorCardProps>) {
    return (
        <View className="flex-row items-center justify-between bg-system-lightest-gray h-[80] rounded-md p-md">
            <View className="flex-row items-center gap-x-xl">
                <View className={`justify-center items-center w-[60] h-[60] rounded-sm ${className}`}>
                    <Icon color={Color["system-white"]} weight="fill" size={36}/>
                </View>
                <Text className="font-kanit-regular text-body text-body-1">{title}</Text>
            </View>
            <CaretRight color={Color["body-2"]} weight="bold"/>
        </View>
    )
}