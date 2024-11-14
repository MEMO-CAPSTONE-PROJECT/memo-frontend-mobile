import { Color } from "@/constants/theme/color";
import { FontSize, FontWeight } from "@/constants/theme/font";
import { Text } from "react-native";

interface MemoTextProps {
    size?: keyof typeof FontSize
    weight?: keyof typeof FontWeight
    color?: keyof typeof Color
    className?: string
    children: string | string[]
}

export default function MemoText({ size = "body", weight = "regular", color = "body-1", className, children }: Readonly<MemoTextProps>) {
    const sizes = `text-${size}`
    const weights = `font-kanit-${weight}`
    const colors = `text-${color}`
    return (
        <Text className={`${sizes} ${weights} ${colors} ${className}`}>{children}</Text>
    )
}