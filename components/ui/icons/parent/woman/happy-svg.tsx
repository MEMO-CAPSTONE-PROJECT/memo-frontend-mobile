import { Color } from "@/constants/theme/color"
import { View } from "react-native"
import Svg, { Ellipse, G, Mask, Path, Rect } from "react-native-svg"

interface ParentWomanHappySvgProps {
    size: number
    flip?: boolean
    className?: string
}

export default function ParentWomanHappySvg({ size, flip, className = "" }: Readonly<ParentWomanHappySvgProps>) {
    return (
        <View className={`${className} ${flip ? "transform scale-x-[-1]" : ""}`}>
            <Svg width={size} height={size} viewBox="0 0 148 145" fill="none">
                <Rect x="5.86169" y="50" width="136" height="94" rx="20" fill={Color["title-1"]} />
                <Path d="M12.8617 54C12.8617 42.9543 21.816 34 32.8617 34H114.862C125.907 34 134.862 42.9543 134.862 54V90C134.862 101.046 125.907 110 114.862 110H32.8617C21.816 110 12.8617 101.046 12.8617 90V54Z" fill={Color["title-1"]} />
                <Rect x="22.8618" y="55" width="102" height="90" rx="30" fill={Color["secondary-4"]} />
                <Rect opacity="0.35" x="73.8618" y="112" width="8" height="10" rx="4" fill={Color["secondary-3"]} />
                <Rect x="86.431" y="99" width="28" height="30" rx="14" fill={Color["system-white"]} />
                <Rect x="86.431" y="95" width="28" height="24" rx="7" fill={Color["system-white"]} />
                <Mask id="mask0_1240_5464" maskUnits="userSpaceOnUse" x="94" y="110" width="13" height="17">
                    <Rect width="13" height="16.9548" rx="6.5" transform="matrix(-1 0 0 1 107 110)" fill={Color["system-white"]} />
                </Mask>
                <G mask="url(#mask0_1240_5464)">
                    <Path d="M113.814 105.032C114.445 99.6932 110.274 95 104.898 95H96.8192C91.4956 95 87.2735 99.4873 87.5974 104.801L88.1602 114.034C88.4188 118.278 93.5347 120.266 96.5914 117.311L96.7308 117.176C98.8199 115.156 102.21 115.436 103.939 117.771C106.531 121.271 112.069 119.799 112.58 115.474L113.814 105.032Z" fill={Color["title-1"]} />
                    <Rect x="102.198" y="113.715" width="4.80603" height="8.05569" rx="2.40301" fill={Color["title-1"]} />
                    <Rect x="94.0023" y="113.75" width="4.73081" height="8.05569" rx="2.36541" fill={Color["title-1"]} />
                    <Rect x="98.7762" y="114.458" width="3.49931" height="7.61646" rx="1.74966" fill={Color["system-white"]} />
                </G>
                <Rect x="40.431" y="99" width="28" height="30" rx="14" fill={Color["system-white"]} />
                <Rect x="40.431" y="95" width="28" height="23" rx="7" fill={Color["system-white"]} />
                <Mask id="mask1_1240_5464" maskUnits="userSpaceOnUse" x="48" y="110" width="13" height="17">
                    <Rect width="13" height="16.9548" rx="6.5" transform="matrix(-1 0 0 1 61 110)" fill={Color["system-white"]} />
                </Mask>
                <G mask="url(#mask1_1240_5464)">
                    <Path d="M67.8142 105.032C68.4453 99.6932 64.2742 95 58.8977 95H50.8192C45.4956 95 41.2735 99.4873 41.5974 104.801L42.1602 114.034C42.4188 118.278 47.5347 120.266 50.5914 117.311L50.7308 117.176C52.8199 115.156 56.2095 115.436 57.9389 117.771C60.5308 121.271 66.0688 119.799 66.5801 115.474L67.8142 105.032Z" fill={Color["title-1"]} />
                    <Rect x="56.1976" y="113.715" width="4.80603" height="8.05569" rx="2.40301" fill={Color["title-1"]} />
                    <Rect x="48.0023" y="113.75" width="4.73081" height="8.05569" rx="2.36541" fill={Color["title-1"]} />
                    <Rect x="52.7762" y="114.458" width="3.49931" height="7.61646" rx="1.74966" fill={Color["system-white"]} />
                </G>
                <Rect x="12.8617" y="27" width="124" height="50" rx="20" fill={Color["title-1"]} />
                <Ellipse cx="20" cy="30" rx="20" ry="30" transform="matrix(-0.430493 0.902594 0.902594 0.430493 94.7234 49)" fill={Color["title-1"]} />
                <Ellipse cx="20.7456" cy="24.3578" rx="20.7456" ry="24.3578" transform="matrix(-0.422618 -0.906308 -0.906308 0.422618 61.5479 90.6038)" fill={Color["title-1"]} />
                <Ellipse cx="20.7456" cy="24.3578" rx="20.7456" ry="24.3578" transform="matrix(-0.422618 -0.906308 -0.906308 0.422618 86.5479 85.6038)" fill={Color["title-1"]} />
                <Ellipse cx="60.4058" cy="30.8434" rx="26" ry="8" transform="rotate(29.7383 60.4058 30.8434)" fill={Color["title-1"]} />
                <Ellipse cx="77.4498" cy="25.8838" rx="34.5942" ry="10.8019" transform="rotate(151.763 77.4498 25.8838)" fill={Color["title-1"]} />
                <Path d="M68.8617 129C68.8617 126.791 70.6526 125 72.8617 125H77.3617H81.8617C84.0708 125 85.8617 126.791 85.8617 129V131C85.8617 133.209 84.0708 135 81.8617 135H77.3617H72.8617C70.6526 135 68.8617 133.209 68.8617 131V129Z" fill={Color["system-white"]} />
            </Svg>
        </View>
    )
}