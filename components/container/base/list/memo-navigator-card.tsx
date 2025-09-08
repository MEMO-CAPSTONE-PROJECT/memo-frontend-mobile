
import MemoBaseNavigatorCard from "@/components/container/base/memo-base-navigator-card";
import { Color } from "@/constants/theme/color";
import { CaretRight, Icon } from "phosphor-react-native";
import { Text, View } from "react-native";

interface MemoNavigatorCardProps {
    title: string
    className: string
    Icon: Icon
    disabled?: boolean
    onPress?: () => void
}

export default function MemoNavigatorCard({
    title, className, Icon, disabled = false, onPress
}: Readonly<MemoNavigatorCardProps>) {
    return (
        <MemoBaseNavigatorCard disabled={disabled} onPress={onPress}>
            <View className="flex-row items-center gap-x-xl">
                <View className={`justify-center items-center w-[60] h-[60] rounded-xsm ${className}`}>
                    <Icon color={Color["system-white"]} weight="fill" size={36}/>
                </View>
                <Text className="font-kanit-regular text-body text-body-1">{title}</Text>
            </View>
            <CaretRight color={Color["body-1"]} weight="bold"/>
        </MemoBaseNavigatorCard>
    )
}