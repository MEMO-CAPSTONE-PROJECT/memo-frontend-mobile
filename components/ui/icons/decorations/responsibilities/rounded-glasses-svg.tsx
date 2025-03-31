import { Color } from "@/constants/theme/color"
import Svg, { Rect } from "react-native-svg"

interface RoundedGlassesSvgProps {
    primaryColor?: string
    width?: number
    height?: number
}

export default function RoundedGlassesSvg({ 
    width = 82,
    height = 32, 
    primaryColor = Color["body-1"],
}: Readonly<RoundedGlassesSvgProps>) {
    return (
        <Svg width={width} height={height} viewBox="0 0 82 32" fill="none">
            <Rect x="33" y="9" width="16" height="3" fill={primaryColor}/>
            <Rect x="48" y="2" width="32" height="28" rx="14" stroke={primaryColor} strokeWidth="4"/>
            <Rect x="2" y="2" width="32" height="28" rx="14" stroke={primaryColor} strokeWidth="4"/>
        </Svg>
    )
}