import { forwardRef } from "react";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";

interface MemoButtonProps {
    variant: keyof MemoButtonVariant
    size?: keyof MemoButtonSize
    name: string
    className?: string
    onPress?: (event: GestureResponderEvent) => void
}
interface MemoButtonVariant {
    primary: string
    secondary: string
    ghost: string
}

interface MemoButtonSize {
    medium: string
}

const MemoButton = forwardRef<View, MemoButtonProps>(({ onPress, name, variant, className, size = "medium" }, ref) => {
    const variants = {
        primary: { color: "bg-primary-2 hover:bg-primary-2-hover", text: "text-system-white" },
        secondary: { color: "bg-secondary-2 hover:bg-secondary-2-hover", text: "text-system-white" },
        ghost: { color: "border-body-1 border-xsm hover:bg-body-1", text: "text-body-1 hover:text-system-white" },
    }
    const sizes = {
        medium: { height: "h-[55px]", width: "w-full", rounded: "rounded-sm" },
    }

    const { color, text } = variants[variant]
    const { height, width, rounded } = sizes[size]

    return (
        <Pressable onPress={onPress} ref={ref} className={`flex justify-center items-center ${color} ${height} ${width} ${rounded} ${className}`}>
            <Text className={`font-kanit-medium text-title ${text} pointer-events-none`}>{name}</Text>
        </Pressable>
    )
})
MemoButton.displayName = "MemoButton"

export default MemoButton