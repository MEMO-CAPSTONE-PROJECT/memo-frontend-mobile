import { Color } from "@/constants/theme/color"
import Svg, { Path } from "react-native-svg"

interface HeadphonesSvgProps {
    primaryColor?: string
    secondaryColor?: string
    width?: number
    height?: number
}

export default function HeadphonesSvg({ 
    width = 142,
    height = 110, 
    primaryColor = Color["secondary-2-hover"],
    secondaryColor = Color["system-dark-brown"]
}: Readonly<HeadphonesSvgProps>) {
    return (
        <Svg width={width} height={height} viewBox="0 0 142 110" fill="none">
            <Path d="M11 76V28C11 16.9543 19.9543 8 31 8H111C122.046 8 131 16.9543 131 28V76" stroke={secondaryColor} strokeWidth="15"/>
            <Path d="M22.9583 85.5C22.9583 99.031 24.0168 110 15.4719 110C6.927 110 0 99.031 0 85.5C0 71.969 6.927 61 15.4719 61C24.0168 61 22.9583 71.969 22.9583 85.5Z" fill={primaryColor}/>
            <Path d="M116.047 85.5C116.047 99.031 114.851 110 124.51 110C134.169 110 142 99.031 142 85.5C142 71.969 134.169 61 124.51 61C114.851 61 116.047 71.969 116.047 85.5Z" fill={primaryColor}/>
        </Svg>
    )
}