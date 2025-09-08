import { Color } from "@/constants/theme/color"
import { View } from "react-native"
import Svg, { Rect } from "react-native-svg"

interface RectangleSvgProps {
    size: number
    color?: keyof typeof Color
    className?: string
}

export default function RectangleSvg({ size, color = "primary-2", className = "" }: Readonly<RectangleSvgProps>) {
    return (
        <View className={className}>
            <Svg width={size} height={size} viewBox="0 0 4 16" fill="none">
                <Rect x="0.750031" y="3.03687" width="4" height="16" fill={Color[color]}/>
            </Svg>
        </View>
    )
}