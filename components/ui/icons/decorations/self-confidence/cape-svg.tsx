import { Color } from "@/constants/theme/color"
import Svg, { Path } from "react-native-svg"

interface CapeSvgProps {
    primaryColor?: string
    width?: number
    height?: number
}

export default function CapeSvg({ 
    width = 150,
    height = 66, 
    primaryColor = Color["system-error-2"],
}: Readonly<CapeSvgProps>) {
    return (
        <Svg width={width} height={height} viewBox="0 0 150 66" fill="none">
            <Path d="M0 66C0 29.5492 29.5492 0 66 0H84C120.451 0 150 29.5492 150 66H0Z" fill={primaryColor}/>
            <Path d="M40 3C40 1.34315 41.3431 0 43 0H107C108.657 0 110 1.34315 110 3C110 4.65685 108.657 6 107 6H43C41.3431 6 40 4.65685 40 3Z" fill={primaryColor}/>
        </Svg>
    )
}