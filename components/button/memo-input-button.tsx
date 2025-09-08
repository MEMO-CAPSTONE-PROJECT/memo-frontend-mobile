import { Color } from "@/constants/theme/color";
import { Icon } from "phosphor-react-native";
import { forwardRef } from "react";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";

interface MemoInputButtonProps {
    size?: keyof MemoInputButtonSize
    icon: Icon
    iconVariant?: keyof MemoIconVariant
    name: string
    onPress?: (event: GestureResponderEvent) => void
}

interface MemoIconVariant {
    default: string
    success: string
    error: string
}

interface MemoInputButtonSize {
    medium: string
}

const MemoInputButton = forwardRef<View, MemoInputButtonProps>(({ onPress, icon: Icon, name, size = "medium", iconVariant = "default" }, ref) => {
    const sizes = {
        medium: { height: "h-5xl", width: "w-full", rounded: "rounded-sm" },
    }
    const iconVariants = {
        default: Color["body-2"],
        success: Color["system-success"],
        error: Color["system-error"]
    }
    const { height, width, rounded } = sizes[size]

    return (
        <TouchableOpacity onPress={onPress} ref={ref} className={`flex-row justify-center items-center border-xsm border-dotted border-body-2 rounded-sm gap-x-md ${height} ${width} ${rounded}`}>
            <Icon size={24} color={iconVariants[iconVariant]} weight="fill"/>
            <Text className={`font-kanit-medium text-caption-1 text-body-2 pointer-events-none`}>{name}</Text>
        </TouchableOpacity>
    )
})
MemoInputButton.displayName = "MemoInputButton"

export default MemoInputButton