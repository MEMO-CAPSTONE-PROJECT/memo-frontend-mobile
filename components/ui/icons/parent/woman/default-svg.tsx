import { ContainerSize } from "@/constants/container-size";
import { Color } from "@/constants/theme/color";
import { View } from "react-native";
import Svg, { Ellipse, G, Mask, Path, Rect } from "react-native-svg";

interface ParentWomanDefaultSvgProps {
    size: number
    className?: string
    flip?: boolean
    container?: keyof typeof ContainerSize
}

export default function ParentWomanDefaultSvg({ size, className = "", flip = false, container = "none" }: Readonly<ParentWomanDefaultSvgProps>) {
    return (
        <View className={`${ContainerSize[container]} ${className} ${flip ? "transform scale-x-[-1]" : ""}`}>
            <Svg width={size} height={size} viewBox="0 0 147 145" fill="none" >
                <Rect x="5" y="50" width="136" height="94" rx="20" fill={Color["title-1"]} />
                <Path d="M12 54C12 42.9543 20.9543 34 32 34H114C125.046 34 134 42.9543 134 54V90C134 101.046 125.046 110 114 110H32C20.9543 110 12 101.046 12 90V54Z" fill={Color["title-1"]} />
                <Rect x="22.0001" y="55" width="102" height="90" rx="30" fill={Color["secondary-4"]} />
                <Rect opacity="0.35" x="73.0001" y="112" width="8" height="10" rx="4" fill={Color["secondary-3"]} />
                <Rect x="86.0001" y="99" width="28" height="30" rx="14" fill={Color["system-white"]} />
                <Rect x="86.0001" y="95" width="28" height="24" rx="7" fill={Color["system-white"]} />
                <Mask id="mask0_923_3207" maskUnits="userSpaceOnUse" x="94" y="107" width="13" height="26">
                    <Rect x="94" y="107" width="13" height="26" rx="6.5" fill={Color["system-white"]} />
                </Mask>
                <G mask="url(#mask0_923_3207)">
                    <Rect x="86" y="92" width="28" height="35.4545" rx="14" fill={Color["title-1"]} />
                </G>
                <Rect x="40.0001" y="99" width="28" height="30" rx="14" fill={Color["system-white"]} />
                <Rect x="40.0001" y="95" width="28" height="23" rx="7" fill={Color["system-white"]} />
                <Mask id="mask1_923_3207" maskUnits="userSpaceOnUse" x="48" y="107" width="13" height="26">
                    <Rect x="48" y="107" width="13" height="26" rx="6.5" fill={Color["system-white"]} />
                </Mask>
                <G mask="url(#mask1_923_3207)">
                    <Rect x="40" y="92" width="28" height="35.4545" rx="14" fill={Color["title-1"]} />
                </G>
                <Rect x="12" y="27" width="124" height="50" rx="20" fill={Color["title-1"]} />
                <Ellipse cx="20" cy="30" rx="20" ry="30" transform="matrix(-0.430493 0.902594 0.902594 0.430493 93.8617 49)" fill={Color["title-1"]} />
                <Ellipse cx="20.7456" cy="24.3578" rx="20.7456" ry="24.3578" transform="matrix(-0.422618 -0.906308 -0.906308 0.422618 60.6863 90.6038)" fill={Color["title-1"]} />
                <Ellipse cx="20.7456" cy="24.3578" rx="20.7456" ry="24.3578" transform="matrix(-0.422618 -0.906308 -0.906308 0.422618 85.6863 85.6038)" fill={Color["title-1"]} />
                <Ellipse cx="59.5441" cy="30.8434" rx="26" ry="8" transform="rotate(29.7383 59.5441 30.8434)" fill={Color["title-1"]} />
                <Ellipse cx="76.588" cy="25.8838" rx="34.5942" ry="10.8019" transform="rotate(151.763 76.588 25.8838)" fill={Color["title-1"]} />
                <Path d="M68 129C68 126.791 69.7909 125 72 125H76.5H81C83.2091 125 85 126.791 85 129V131C85 133.209 83.2091 135 81 135H76.5H72C69.7909 135 68 133.209 68 131V129Z" fill={Color["system-white"]} />
            </Svg>
        </View>
    )
}