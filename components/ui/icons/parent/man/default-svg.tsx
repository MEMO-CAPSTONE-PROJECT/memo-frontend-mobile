import { ContainerSize } from "@/constants/container-size";
import { Color } from "@/constants/theme/color";
import { ContainerType } from "@/types/container-type";
import { View } from "react-native";
import Svg, { Ellipse, G, Mask, Path, Rect } from "react-native-svg";

interface ParentManDefaultSvgProps {
    size: number
    className?: string
    flip?: boolean
    container?: keyof ContainerType
}

export default function ParentManDefaultSvg({ size, className = "", flip = false, container = "none" }: Readonly<ParentManDefaultSvgProps>) {
    return (
        <View className={`${ContainerSize[container]} ${className} ${flip ? "transform scale-x-[-1]" : ""}`}>
            <Svg width={size} height={size} viewBox="0 0 147 145" fill="none">
                <Path d="M12 54C12 42.9543 20.9543 34 32 34H114C125.046 34 134 42.9543 134 54V90C134 101.046 125.046 110 114 110H32C20.9543 110 12 101.046 12 90V54Z" fill={Color["title-1"]} />
                <Rect x="22.0001" y="55" width="102" height="90" rx="30" fill={Color["secondary-4"]} />
                <Rect opacity="0.35" x="73.0001" y="112" width="8" height="10" rx="4" fill={Color["secondary-3"]} />
                <Path opacity="0.35" d="M34.0001 124.5C34.0001 123.119 35.1194 122 36.5001 122C37.8808 122 39.0001 123.119 39.0001 124.5C39.0001 125.881 37.8808 127 36.5001 127C35.1194 127 34.0001 125.881 34.0001 124.5Z" fill={Color["secondary-3"]} />
                <Rect opacity="0.35" x="39.0001" y="128" width="4" height="4" rx="2" fill={Color["secondary-3"]} />
                <Rect x="86.0001" y="99" width="28" height="30" rx="14" fill={Color["system-white"]} />
                <Rect x="86.0001" y="95" width="28" height="24" rx="7" fill={Color["system-white"]} />
                <Mask id="mask0_923_3206" maskUnits="userSpaceOnUse" x="94" y="107" width="13" height="26">
                    <Rect x="94" y="107" width="13" height="26" rx="6.5" fill={Color["system-white"]} />
                </Mask>
                <G mask="url(#mask0_923_3206)">
                    <Rect x="86" y="92" width="28" height="35.4545" rx="14" fill={Color["title-1"]} />
                </G>
                <Rect x="40.0001" y="99" width="28" height="30" rx="14" fill={Color["system-white"]} />
                <Rect x="40.0001" y="95" width="28" height="23" rx="7" fill={Color["system-white"]} />
                <Mask id="mask1_923_3206" maskUnits="userSpaceOnUse" x="48" y="107" width="13" height="26">
                    <Rect x="48" y="107" width="13" height="26" rx="6.5" fill={Color["system-white"]} />
                </Mask>
                <G mask="url(#mask1_923_3206)">
                    <Rect x="40" y="92" width="28" height="35.4545" rx="14" fill={Color["title-1"]} />
                </G>
                <Rect x="12" y="27" width="124" height="50" rx="20" fill={Color["title-1"]} />
                <Ellipse cx="28.2155" cy="78.6356" rx="8.5" ry="15.5" transform="rotate(30 28.2155 78.6356)" fill={Color["title-1"]} />
                <Ellipse cx="14.2155" cy="65.6356" rx="8.5" ry="15.5" transform="rotate(24.7881 14.2155 65.6356)" fill={Color["title-1"]} />
                <Ellipse cx="8.5" cy="15.5" rx="8.5" ry="15.5" transform="matrix(-0.907865 0.419264 0.419264 0.907865 132.434 45)" fill={Color["title-1"]} />
                <Ellipse cx="15" cy="24.3578" rx="15" ry="24.3578" transform="matrix(-0.766044 0.642788 0.642788 0.766044 108.981 50)" fill={Color["title-1"]} />
                <Ellipse cx="59.5441" cy="30.8434" rx="26" ry="8" transform="rotate(29.7383 59.5441 30.8434)" fill={Color["title-1"]} />
                <Ellipse cx="76.5881" cy="25.8838" rx="34.5942" ry="10.8019" transform="rotate(151.763 76.5881 25.8838)" fill={Color["title-1"]} />
                <Path d="M67 132C67 130.343 68.3431 129 70 129H77H84C85.6569 129 87 130.343 87 132C87 133.657 85.6569 135 84 135H77H70C68.3431 135 67 133.657 67 132Z" fill={Color["system-white"]} />
                <Rect x="44" y="88.7432" width="20" height="5" rx="2.5" transform="rotate(-5 44 88.7432)" fill={Color["title-1"]} />
                <Rect x="90.4358" y="87" width="20" height="5" rx="2.5" transform="rotate(5 90.4358 87)" fill={Color["title-1"]} />
            </Svg>
        </View>
    )
}