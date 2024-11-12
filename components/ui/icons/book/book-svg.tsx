import { Color } from "@/constants/theme/color";
import { View } from "react-native";
import { Path, Rect, Svg } from "react-native-svg";

interface BookSvgProps {
    size: number
    className?: string
}

export default function BookSvg({ size,className = "" }: Readonly<BookSvgProps>) {
    return (
        <View className={className}>
            <Svg width={size} height={size} viewBox="0 0 92 132" fill="none">
                <Path d="M8.99999 122.625H50.25H91.4999V132H47.7334H8.99994L8.99999 127.924V122.625Z" fill={Color["primary-2"]}/>
                <Rect y="4" width="92" height="128" rx="10" fill={Color["primary-2"]}/>
                <Rect y="4" width="19" height="128" rx="9.5" fill={Color["primary-3"]}/>
                <Path d="M12 4H19V132H12V4Z" fill={Color["primary-2"]}/>
                <Path d="M10 4H12V132H10V4Z" fill={Color["primary-3"]}/>
                <Rect x="9" y="117" width="83" height="15" fill={Color["primary-3"]}/>
                <Path d="M12 109C12 106.239 14.2386 104 17 104H48.75H80.5C83.2614 104 85.5 106.239 85.5 109V117C85.5 119.761 83.2614 122 80.5 122H46.508H17C14.2386 122 12 119.761 12 117L12 114.174V109Z" fill={Color["system-white"]}/>
                <Path d="M22 104H57H92V122H54.8647H22L22 114.174V104Z" fill={Color["system-white"]}/>
                <Rect x="64" width="17" height="26" rx="1.5" fill={Color["secondary-2"]}/>
                <Path d="M67.7071 22.7071C67.0771 22.0771 67.5233 21 68.4142 21H80C80.5523 21 81 21.4477 81 22V32.381C81 33.2261 80.0167 33.6902 79.3643 33.1529L72.5 27.5L67.7071 22.7071Z" fill={Color["secondary-2"]}/>
                <Path d="M77.2929 22.7071C77.9229 22.0771 77.4767 21 76.5858 21H65C64.4477 21 64 21.4477 64 22V32.381C64 33.2261 64.9833 33.6902 65.6357 33.1529L72.5 27.5L77.2929 22.7071Z" fill={Color["secondary-2"]}/>
            </Svg>
        </View>
    )
}