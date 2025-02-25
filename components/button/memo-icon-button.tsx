import { Color } from "@/constants/theme/color";
import { Icon } from "phosphor-react-native";
import { TouchableOpacity, View } from "react-native";

interface MemoIconButtonProps {
    icon: Icon
    className?: string
    onPress?: () => void
}

export default function MemoIconButton({ icon: Icon, className, onPress }: Readonly<MemoIconButtonProps>) {
    return (
        <TouchableOpacity className={className} onPress={onPress}>
            <View className="w-4xl h-4xl rounded-circle bg-primary-2 justify-center items-center">
                <Icon color={Color["system-white"]} size={26} weight="bold" />
            </View>
        </TouchableOpacity>
    )
}
