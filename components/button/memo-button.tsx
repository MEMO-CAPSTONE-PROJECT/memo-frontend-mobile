import { useMemo } from "react";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";

interface MemoButtonProps {
    variant: "primary"
    size?: "medium" 
    name: string
    onPress?: (event: GestureResponderEvent) => void
}

export default function MemoButton({ onPress, name, variant, size = "medium" }: Readonly<MemoButtonProps>) {
    const { color, text } = useMemo(() => {
        const classes = {
            primary: { color: "bg-primary-2", text: "text-system-white" },
        }
        return classes[variant]
    }, [variant])
    const { height, width, rounded } = useMemo(() => {
        const classes = {
            medium: { height: "h-[60px]", width: "w-full", rounded: "rounded-[15px]" },
        }
        return classes[size]
    }, [size])
    
    return (
        <View className={`flex justify-center items-center ${color} ${height} ${width} ${rounded}`}>
            <Pressable onPress={onPress}>
                <Text className={`font-kanit-medium text-title ${text}`}>{name}</Text>
            </Pressable>
        </View>
    )
}