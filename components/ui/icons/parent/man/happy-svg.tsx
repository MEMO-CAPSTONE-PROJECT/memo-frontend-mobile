import { Color } from "@/constants/theme/color";
import { View } from "react-native";
import Svg, { Ellipse, G, Mask, Path, Rect } from "react-native-svg";

interface ParentManHappySvgProps {
    size: number
    flip?: boolean
    className?: string
}
export default function ParentManHappySvg({ size, flip, className = "" }: Readonly<ParentManHappySvgProps>) {
    return (
        <View className={`${className} ${flip ? "transform scale-x-[-1]" : ""}`}>
            <Svg width={size} height={size} viewBox="0 0 147 145" fill="none">
                <Path d="M12.4309 54C12.4309 42.9543 21.3852 34 32.4309 34H114.431C125.477 34 134.431 42.9543 134.431 54V90C134.431 101.046 125.477 110 114.431 110H32.4309C21.3852 110 12.4309 101.046 12.4309 90V54Z" fill={Color["title-1"]} />
                <Rect x="22.431" y="55" width="102" height="90" rx="30" fill={Color["secondary-4"]} />
                <Rect opacity="0.35" x="73.431" y="112" width="8" height="10" rx="4" fill={Color["secondary-3"]} />
                <Path opacity="0.35" d="M34.431 124.5C34.431 123.119 35.5503 122 36.931 122C38.3117 122 39.431 123.119 39.431 124.5C39.431 125.881 38.3117 127 36.931 127C35.5503 127 34.431 125.881 34.431 124.5Z" fill={Color["secondary-3"]} />
                <Rect opacity="0.35" x="39.431" y="128" width="4" height="4" rx="2" fill={Color["secondary-3"]} />
                <Rect x="86.431" y="99" width="28" height="30" rx="14" fill={Color["system-white"]} />
                <Rect x="86.431" y="95" width="28" height="24" rx="7" fill={Color["system-white"]} />
                <Mask id="mask0_967_3234" maskUnits="userSpaceOnUse" x="94" y="110" width="13" height="17">
                    <Rect width="13" height="16.9548" rx="6.5" transform="matrix(-1 0 0 1 107 110)" fill={Color["system-white"]} />
                </Mask>
                <G mask="url(#mask0_967_3234)">
                    <Path d="M113.814 105.032C114.445 99.6932 110.274 95 104.898 95H96.8192C91.4956 95 87.2735 99.4873 87.5974 104.801L88.1602 114.034C88.4188 118.278 93.5347 120.266 96.5914 117.311L96.7308 117.176C98.8199 115.156 102.21 115.436 103.939 117.771C106.531 121.271 112.069 119.799 112.58 115.474L113.814 105.032Z" fill={Color["title-1"]} />
                    <Rect x="102.198" y="113.715" width="4.80603" height="8.05569" rx="2.40301" fill={Color["title-1"]} />
                    <Rect x="94.0023" y="113.75" width="4.73081" height="8.05569" rx="2.36541" fill={Color["title-1"]} />
                    <Rect x="98.7762" y="114.458" width="3.49931" height="7.61646" rx="1.74966" fill={Color["system-white"]} />
                </G>
                <Rect x="40.431" y="99" width="28" height="30" rx="14" fill={Color["system-white"]} />
                <Rect x="40.431" y="95" width="28" height="23" rx="7" fill={Color["system-white"]} />
                <Mask id="mask1_967_3234" maskUnits="userSpaceOnUse" x="48" y="110" width="13" height="17">
                    <Rect width="13" height="16.9548" rx="6.5" transform="matrix(-1 0 0 1 61 110)" fill={Color["system-white"]} />
                </Mask>
                <G mask="url(#mask1_967_3234)">
                    <Path d="M67.8142 105.032C68.4453 99.6932 64.2742 95 58.8977 95H50.8192C45.4956 95 41.2735 99.4873 41.5974 104.801L42.1602 114.034C42.4188 118.278 47.5347 120.266 50.5914 117.311L50.7308 117.176C52.8199 115.156 56.2095 115.436 57.9389 117.771C60.5308 121.271 66.0688 119.799 66.5801 115.474L67.8142 105.032Z" fill={Color["title-1"]} />
                    <Rect x="56.1976" y="113.715" width="4.80603" height="8.05569" rx="2.40301" fill={Color["title-1"]} />
                    <Rect x="48.0023" y="113.75" width="4.73081" height="8.05569" rx="2.36541" fill={Color["title-1"]} />
                    <Rect x="52.7762" y="114.458" width="3.49931" height="7.61646" rx="1.74966" fill={Color["system-white"]} />
                </G>
                <Rect x="12.4309" y="27" width="124" height="50" rx="20" fill={Color["title-1"]} />
                <Ellipse cx="28.6464" cy="78.6356" rx="8.5" ry="15.5" transform="rotate(30 28.6464 78.6356)" fill={Color["title-1"]} />
                <Ellipse cx="14.6464" cy="65.6356" rx="8.5" ry="15.5" transform="rotate(24.7881 14.6464 65.6356)" fill={Color["title-1"]} />
                <Ellipse cx="8.5" cy="15.5" rx="8.5" ry="15.5" transform="matrix(-0.907865 0.419264 0.419264 0.907865 132.865 45)" fill={Color["title-1"]} />
                <Ellipse cx="15" cy="24.3578" rx="15" ry="24.3578" transform="matrix(-0.766044 0.642788 0.642788 0.766044 109.412 50)" fill={Color["title-1"]} />
                <Ellipse cx="59.975" cy="30.8434" rx="26" ry="8" transform="rotate(29.7383 59.975 30.8434)" fill={Color["title-1"]} />
                <Ellipse cx="77.019" cy="25.8838" rx="34.5942" ry="10.8019" transform="rotate(151.763 77.019 25.8838)" fill={Color["title-1"]} />
                <Path d="M67.4309 132C67.4309 130.343 68.7741 129 70.4309 129H77.4309H84.4309C86.0878 129 87.4309 130.343 87.4309 132C87.4309 133.657 86.0878 135 84.4309 135H77.4309H70.4309C68.7741 135 67.4309 133.657 67.4309 132Z" fill={Color["system-white"]} />
                <Rect x="44.4309" y="88.7432" width="20" height="5" rx="2.5" transform="rotate(-5 44.4309 88.7432)" fill={Color["title-1"]} />
                <Rect x="90.8667" y="87" width="20" height="5" rx="2.5" transform="rotate(5 90.8667 87)" fill={Color["title-1"]} />
            </Svg>
        </View>
    )
}