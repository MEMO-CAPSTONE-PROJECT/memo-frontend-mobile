import { Color } from "@/constants/theme/color";
import Svg, { Path, Rect } from "react-native-svg";

interface BodySvgProps {
    width?: number
    height?: number
    skinColor?: string
    clothColor?: string
}

export default function BodySvg({ 
    width = 115 , height = 68, 
    clothColor = Color["primary-2"], 
    skinColor = Color["secondary-4"] 
}: Readonly<BodySvgProps>) {
    return (
        <Svg width={width} height={height} viewBox="0 0 115 68" fill="none">
            <Path d="M0 48C0 25.9086 17.9086 8 40 8H75C97.0914 8 115 25.9086 115 48V68H0V48Z" fill={clothColor}/>
            <Rect x="40" width="35" height="8" fill={skinColor}/>
            {/* Neck here */}
            {/* <Path d="M40 8H75V8C75 14.6274 69.6274 20 63 20H52C45.3726 20 40 14.6274 40 8V8Z" fill={skinColor}/> */}
        </Svg>
    )
}