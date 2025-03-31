import { Color } from "@/constants/theme/color"
import Svg, { Path } from "react-native-svg"

interface NecktieSvgProps {
    primaryColor?: string
    width?: number
    height?: number
}

export default function NecktieSvg({ 
    width = 44,
    height = 55, 
    primaryColor = Color["title-1"]
}: Readonly<NecktieSvgProps>) {
    return (
        <Svg width={width} height={height} viewBox="0 0 44 55" fill="none">
            <Path d="M44 5.5C44 6.32843 43.3284 7 42.5 7L1.5 7C0.671574 7 -8.97223e-09 6.32843 -2.004e-08 5.5C-3.11078e-08 4.67157 0.671574 4 1.5 4L42.5 4C43.3284 4 44 4.67157 44 5.5Z" fill={primaryColor}/>
            <Path d="M15.8199 5.80099C15.9222 4.77859 16.7825 4 17.81 4H26.1901C27.2176 4 28.0779 4.77859 28.1801 5.80099L31.7801 41.801C31.8978 42.9784 30.9733 44 29.79 44H14.21C13.0267 44 12.1022 42.9784 12.2199 41.801L15.8199 5.80099Z" fill={primaryColor}/>
            <Path d="M23.5619 53.0478C22.7612 54.0486 21.2391 54.0486 20.4384 53.0478L12.5996 43.2494C11.5519 41.9399 12.4843 40 14.1613 40L29.8388 40C31.5158 40 32.4481 41.9399 31.4005 43.2494L23.5619 53.0478Z" fill={primaryColor}/>
        </Svg>
    )
}