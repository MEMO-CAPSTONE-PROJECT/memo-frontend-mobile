import { Color } from "@/constants/theme/color";
import { View } from "react-native";
import Svg, { Circle, Ellipse, G, Mask, Path, Rect } from "react-native-svg";

interface TeacherManDefaultSvgProps {
    size: number
    flip?: boolean
    className?: string
}

export default function TeacherManDefaultSvg({ size, flip, className = "" }: Readonly<TeacherManDefaultSvgProps>) {
    return (
        <View className={`${className} ${flip ? "transform scale-x-[-1]" : ""}`}>
            <Svg width={size} height={size} viewBox="0 0 147 145" fill="none">
                <Path d="M12 54C12 42.9543 20.9543 34 32 34H114C125.046 34 134 42.9543 134 54V90C134 101.046 125.046 110 114 110H32C20.9543 110 12 101.046 12 90V54Z" fill={Color["title-1"]} />
                <Rect x="22.0001" y="55" width="102" height="90" rx="30" fill={Color["secondary-4"]} />
                <Rect opacity="0.35" x="73.0001" y="112" width="8" height="10" rx="4" fill={Color["secondary-3"]}/>
                <Path opacity="0.35" d="M34.0001 124.5C34.0001 123.119 35.1194 122 36.5001 122C37.8808 122 39.0001 123.119 39.0001 124.5C39.0001 125.881 37.8808 127 36.5001 127C35.1194 127 34.0001 125.881 34.0001 124.5Z" fill={Color["secondary-3"]}/>
                <Rect opacity="0.35" x="39.0001" y="128" width="4" height="4" rx="2" fill={Color["secondary-3"]}/>
                <Rect x="86.0001" y="99" width="28" height="30" rx="14" fill={Color["system-white"]} />
                <Rect x="86.0001" y="95" width="28" height="24" rx="7" fill={Color["system-white"]} />
                <Mask id="mask0_1228_6373" maskUnits="userSpaceOnUse" x="95" y="110" width="10" height="16">
                    <Rect x="95" y="110" width="10" height="16" rx="5" fill={Color["system-white"]}/>
                </Mask>
                <G mask="url(#mask0_1228_6373)">
                    <Rect x="86" y="96.5264" width="28" height="29.8565" rx="14" fill={Color["title-1"]} />
                </G>
                <Rect x="40.0001" y="99" width="28" height="30" rx="14" fill={Color["system-white"]} />
                <Rect x="40.0001" y="95" width="28" height="23" rx="7" fill={Color["system-white"]} />
                <Mask id="mask1_1228_6373"maskUnits="userSpaceOnUse" x="49" y="110" width="10" height="15">
                    <Rect x="49" y="110" width="10" height="15" rx="5" fill={Color["system-white"]}/>
                </Mask>
                <G mask="url(#mask1_1228_6373)">
                    <Rect x="40" y="97.3684" width="28" height="27.9904" rx="13.9952" fill={Color["title-1"]} />
                </G>
                <Ellipse cx="109.5" cy="68.5" rx="19.5" ry="21.5" fill={Color["title-1"]} />
                <Rect x="8" y="27" width="131" height="50" rx="20" fill={Color["title-1"]} />
                <Ellipse cx="28.2155" cy="78.6356" rx="8.5" ry="15.5" transform="rotate(24.7881 28.2155 78.6356)" fill={Color["title-1"]} />
                <Ellipse cx="14.2155" cy="64.6356" rx="8.5" ry="15.5" transform="rotate(24.7881 14.2155 64.6356)" fill={Color["title-1"]} />
                <Ellipse cx="8.5" cy="15.5" rx="8.5" ry="15.5" transform="matrix(-0.907865 0.419264 0.419264 0.907865 133.434 44)" fill={Color["title-1"]} />
                <Ellipse cx="10.8346" cy="15.5" rx="10.8346" ry="15.5" transform="matrix(-0.907865 0.419264 0.419264 0.907865 124.434 59)" fill={Color["title-1"]} />
                <Ellipse cx="59.5441" cy="30.8434" rx="26" ry="8" transform="rotate(29.7383 59.5441 30.8434)" fill={Color["title-1"]} />
                <Ellipse cx="76.5881" cy="25.8837" rx="34.5942" ry="10.8019" transform="rotate(151.763 76.5881 25.8837)" fill={Color["title-1"]} />
                <Path d="M67 134C67 132.895 67.8954 132 69 132H77H85C86.1046 132 87 132.895 87 134C87 135.105 86.1046 136 85 136H77H69C67.8954 136 67 135.105 67 134Z" fill={Color["system-white"]} />
                <Circle cx="54.0001" cy="116" r="16" stroke={Color["body-1"]} strokeWidth="4" />
                <Rect x="71.0001" y="112" width="12" height="3" fill={Color["body-1"]} />
                <Circle cx="100" cy="116" r="16" stroke={Color["body-1"]} strokeWidth="4" />
                <Rect x="43.8202" y="88.8811" width="20" height="5" rx="2.5" transform="rotate(-5 43.8202 88.8811)" fill={Color["title-1"]} />
                <Rect x="90.256" y="87.1379" width="20" height="5" rx="2.5" transform="rotate(5 90.256 87.1379)" fill={Color["title-1"]} />
                <Ellipse cx="72.6403" cy="127.689" rx="7.68226" ry="4.01895" transform="rotate(-22.8739 72.6403 127.689)" fill={Color["title-1"]} />
                <Ellipse cx="7.68226" cy="4.01895" rx="7.68226" ry="4.01895" transform="matrix(-0.921362 -0.388705 -0.388705 0.921362 89.2806 126.972)" fill={Color["title-1"]} />
            </Svg>
        </View>
    )
}