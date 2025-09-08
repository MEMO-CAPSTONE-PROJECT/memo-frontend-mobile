import { Color } from "@/constants/theme/color";
import { View } from "react-native";
import Svg, { Ellipse, Rect } from "react-native-svg";

interface CloudSvgProps {
    size: number;
    className?: string;
}

export default function CloudSvg({ size, className }: Readonly<CloudSvgProps>) {
    return (
        <View className={className}>            
            <Svg width={size} height={size} viewBox="0 0 248 138" fill="none">
                <Rect x="247.641" y="136.916" width="247.3" height="78.9169" rx="39.4584" transform="rotate(179.751 247.641 136.916)" fill={Color["system-white"]} />
                <Ellipse cx="148.5" cy="58.5" rx="59.5" ry="58.5" fill={Color["system-white"]} />
                <Ellipse cx="71.5" cy="62" rx="36.5" ry="36" fill={Color["system-white"]} />
            </Svg>
        </View>
    )
}