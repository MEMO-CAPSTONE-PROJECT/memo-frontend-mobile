import { Color } from "@/constants/theme/color";
import { View } from "react-native";
import Svg, { Circle, Ellipse, G, Mask, Path, Rect } from "react-native-svg";

interface TeacherManQuestionSvgProps {
    size: number
    flip?: boolean
    className?: string
}

export default function TeacherManQuestionSvg({ size, flip = false, className = "" }: Readonly<TeacherManQuestionSvgProps>) {
    return (
        <View className={`${className} ${flip ? "transform scale-x-[-1]" : ""}`}>
            <Svg width={size} height={size} viewBox="0 0 171 170" fill="none">
                <Path d="M12.8617 54C12.8617 42.9543 21.816 34 32.8617 34H114.862C125.907 34 134.862 42.9543 134.862 54V90C134.862 101.046 125.907 110 114.862 110H32.8617C21.816 110 12.8617 101.046 12.8617 90V54Z" fill={Color["title-1"]} />
                <Rect x="22.8618" y="55" width="102" height="90" rx="30" fill={Color["secondary-4"]} />
                <Rect opacity="0.35" x="73.8618" y="112" width="8" height="10" rx="4" fill={Color["secondary-3"]} />
                <Path opacity="0.35" d="M34.8618 124.5C34.8618 123.119 35.9811 122 37.3618 122V122C38.7425 122 39.8618 123.119 39.8618 124.5V124.5C39.8618 125.881 38.7425 127 37.3618 127V127C35.9811 127 34.8618 125.881 34.8618 124.5V124.5Z" fill={Color["secondary-3"]} />
                <Rect opacity="0.35" x="39.8618" y="128" width="4" height="4" rx="2" fill={Color["secondary-3"]} />
                <Rect x="86.8618" y="99" width="28" height="30" rx="14" fill={Color["system-white"]} />
                <Rect x="86.8618" y="95" width="28" height="24" rx="7" fill={Color["system-white"]} />
                <Mask id="mask0_1606_4578" maskUnits="userSpaceOnUse" x="96" y="110" width="10" height="16">
                    <Rect x="96" y="110" width="10" height="16" rx="5" fill={Color["system-white"]} />
                </Mask>
                <G mask="url(#mask0_1606_4578)">
                    <Rect x="87" y="96.5264" width="28" height="29.8565" rx="14" fill={Color["title-1"]} />
                </G>
                <Rect x="40.8618" y="99" width="28" height="30" rx="14" fill={Color["system-white"]} />
                <Rect x="40.8618" y="95" width="28" height="23" rx="7" fill={Color["system-white"]} />
                <Mask id="mask1_1606_4578" maskUnits="userSpaceOnUse" x="49" y="115" width="13" height="13">
                    <Rect x="49" y="115" width="13" height="13" rx="6.5" fill={Color["system-white"]} />
                </Mask>
                <G mask="url(#mask1_1606_4578)">
                    <Rect x="41" y="106.5" width="28" height="17.7273" rx="8.86364" fill={Color["title-1"]} />
                </G>
                <Ellipse cx="110.362" cy="68.5" rx="19.5" ry="21.5" fill={Color["title-1"]} />
                <Rect x="8.86169" y="27" width="131" height="50" rx="20" fill={Color["title-1"]} />
                <Ellipse cx="29.0772" cy="78.6356" rx="8.5" ry="15.5" transform="rotate(24.7881 29.0772 78.6356)" fill={Color["title-1"]} />
                <Ellipse cx="15.0772" cy="64.6356" rx="8.5" ry="15.5" transform="rotate(24.7881 15.0772 64.6356)" fill={Color["title-1"]} />
                <Ellipse cx="8.5" cy="15.5" rx="8.5" ry="15.5" transform="matrix(-0.907865 0.419264 0.419264 0.907865 134.295 44)" fill={Color["title-1"]} />
                <Ellipse cx="10.8346" cy="15.5" rx="10.8346" ry="15.5" transform="matrix(-0.907865 0.419264 0.419264 0.907865 125.295 59)" fill={Color["title-1"]} />
                <Ellipse cx="60.4058" cy="30.8434" rx="26" ry="8" transform="rotate(29.7383 60.4058 30.8434)" fill={Color["title-1"]} />
                <Ellipse cx="77.4498" cy="25.8837" rx="34.5942" ry="10.8019" transform="rotate(151.763 77.4498 25.8837)" fill={Color["title-1"]} />
                <Path d="M73.4308 134C73.4308 132.895 74.3262 132 75.4308 132H77.4308H79.4308C80.5354 132 81.4308 132.895 81.4308 134V134C81.4308 135.105 80.5354 136 79.4308 136H77.4308H75.4308C74.3262 136 73.4308 135.105 73.4308 134V134Z" fill={Color["system-white"]} />
                <Circle cx="54.8618" cy="116" r="16" stroke={Color["body-1"]} strokeWidth="4" />
                <Rect x="71.8618" y="112" width="12" height="3" fill={Color["body-1"]} />
                <Circle cx="100.862" cy="116" r="16" stroke={Color["body-1"]} strokeWidth="4" />
                <Rect x="44.6819" y="88.8811" width="20" height="5" rx="2.5" transform="rotate(-5 44.6819 88.8811)" fill={Color["title-1"]} />
                <Rect x="91.1177" y="87.1379" width="20" height="5" rx="2.5" transform="rotate(5 91.1177 87.1379)" fill={Color["title-1"]} />
                <Ellipse cx="73.502" cy="127.689" rx="7.68226" ry="4.01895" transform="rotate(-22.8739 73.502 127.689)" fill={Color["title-1"]} />
                <Ellipse cx="7.68226" cy="4.01895" rx="7.68226" ry="4.01895" transform="matrix(-0.921362 -0.388705 -0.388705 0.921362 90.1423 126.972)" fill={Color["title-1"]} />
                <Path d="M129.895 144.154L130.261 143.361C131.273 141.169 132.26 139.506 133.221 138.373C134.195 137.246 135.217 136.455 136.287 136.002C137.363 135.535 138.561 135.212 139.88 135.032C140.928 134.898 141.888 134.714 142.762 134.482C143.655 134.243 144.43 133.902 145.089 133.458C145.747 133.015 146.258 132.399 146.622 131.613C146.973 130.852 147.103 130.097 147.011 129.347C146.919 128.597 146.63 127.919 146.143 127.313C145.675 126.7 145.062 126.215 144.304 125.858C143.545 125.501 142.752 125.339 141.923 125.373C141.106 125.412 140.337 125.655 139.616 126.1C138.913 126.538 138.346 127.206 137.917 128.102L129.049 123.927C130.339 121.237 131.986 119.312 133.992 118.153C136.011 117 138.213 116.482 140.599 116.601C142.991 116.707 145.395 117.329 147.811 118.466C150.458 119.713 152.619 121.233 154.294 123.027C155.982 124.826 157.045 126.811 157.483 128.979C157.921 131.148 157.601 133.4 156.523 135.734C155.814 137.268 154.932 138.502 153.876 139.433C152.82 140.364 151.621 141.064 150.279 141.531C148.956 141.991 147.508 142.298 145.935 142.452C144.709 142.566 143.632 142.781 142.703 143.097C141.788 143.42 140.985 143.905 140.294 144.553C139.61 145.189 139.002 146.08 138.473 147.228L138.106 148.021L129.895 144.154ZM128.295 158.85C126.907 158.196 125.945 157.147 125.408 155.7C124.884 154.26 124.95 152.847 125.606 151.46C126.224 150.087 127.245 149.147 128.668 148.64C130.11 148.126 131.525 148.195 132.913 148.849C134.237 149.472 135.173 150.51 135.723 151.962C136.279 153.401 136.248 154.808 135.629 156.181C135.188 157.103 134.554 157.833 133.727 158.37C132.913 158.913 132.022 159.231 131.056 159.326C130.102 159.426 129.182 159.268 128.295 158.85Z" fill={Color["body-1"]} />
            </Svg>
        </View>
    )
}