import { Color } from "@/constants/theme/color";
import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface CircleProps {
    size: number
    color: keyof typeof Color
    className?: string
}

export default function CircleIcon({ size, color, className = "" }: Readonly<CircleProps>) {
    return (
        <View className={className}>
            <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
                <Circle cx="50" cy="50" r="50" fill={Color[color]}/>
            </Svg>
        </View>
    )
}