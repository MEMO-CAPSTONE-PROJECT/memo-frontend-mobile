import { Color } from "@/constants/theme/color";
import { View } from "react-native";
import { Circle, Ellipse, G, Mask, Path, Rect, Svg } from "react-native-svg";

interface MascotGirlHappySvgProps {
    size?: number
    width?: number
    height?: number
    flip?: boolean
    className?: string
    ribbonPrimaryColor?: string
    ribbonSecondaryColor?: string
}

export default function MascotGirlHappySvg({ size, width, height, flip, ribbonPrimaryColor = Color["primary-2"], ribbonSecondaryColor = Color["primary-3"], className = "" }: Readonly<MascotGirlHappySvgProps>) {
    return (
        <View className={`${className} ${flip ? "transform scale-x-[-1]" : ""}`}>
            <Svg width={width ?? size} height={height ?? size} viewBox="0 0 122 147" fill="none">
                <Rect y="29" width="122" height="118" rx="20" fill={Color["title-1"]}/>
                <Rect x="10.0001" y="57" width="102" height="90" rx="30" fill={Color["secondary-4"]}/>
                <Path d="M55.0001 130C55.0001 127.791 56.791 126 59.0001 126H65.0001H71.0001C73.2093 126 75.0001 127.791 75.0001 130V132C75.0001 134.209 73.2093 136 71.0001 136H65.0001H59.0001C56.791 136 55.0001 134.209 55.0001 132V130Z" fill={Color["system-white"]}/>
                <Rect opacity="0.35" x="61.0001" y="114" width="8" height="10" rx="4" fill={Color["secondary-3"]}/>
                <Rect x="74.0001" y="101" width="28" height="30" rx="14" fill={Color["system-white"]}/>
                <Rect x="74.0001" y="97" width="28" height="24" rx="7" fill={Color["system-white"]}/>
                <Mask id="mask0_512_276" maskUnits="userSpaceOnUse" x="82" y="112" width="13" height="17">
                    <Rect width="13" height="16.9548" rx="6.5" transform="matrix(-1 0 0 1 95 112)" fill={Color["system-white"]}/>
                </Mask>
                <G mask="url(#mask0_512_276)">
                    <Path d="M101.814 107.032C102.445 101.693 98.2742 97 92.8977 97H84.8192C79.4956 97 75.2735 101.487 75.5974 106.801L76.1602 116.034C76.4188 120.278 81.5347 122.266 84.5914 119.311L84.7308 119.176C86.8199 117.156 90.2095 117.436 91.9389 119.771C94.5308 123.271 100.069 121.799 100.58 117.474L101.814 107.032Z" fill={Color["title-1"]}/>
                    <Rect x="90.1976" y="115.715" width="4.80603" height="8.05569" rx="2.40301" fill={Color["title-1"]}/>
                    <Rect x="82.0023" y="115.751" width="4.73081" height="8.05569" rx="2.36541" fill={Color["title-1"]}/>
                    <Rect x="86.7762" y="116.458" width="3.49931" height="7.61646" rx="1.74966" fill={Color["system-white"]}/>
                </G>
                <Rect x="28.0001" y="101" width="28" height="30" rx="14" fill={Color["system-white"]}/>
                <Rect x="28.0001" y="97" width="28" height="23" rx="7" fill={Color["system-white"]}/>
                <Rect x="28" y="97" width="28" height="17" rx="7" fill={Color["system-white"]}/>
                <Mask id="mask1_512_276" maskUnits="userSpaceOnUse" x="36" y="112" width="13" height="17">
                    <Rect width="13" height="16.9548" rx="6.5" transform="matrix(-1 0 0 1 49 112)" fill={Color["system-white"]}/>
                </Mask>
                <G mask="url(#mask1_512_276)">
                    <Path d="M55.8142 107.032C56.4453 101.693 52.2742 97 46.8977 97H38.8192C33.4956 97 29.2735 101.487 29.5974 106.801L30.1602 116.034C30.4188 120.278 35.5347 122.266 38.5914 119.311L38.7308 119.176C40.8199 117.156 44.2095 117.436 45.9389 119.771C48.5308 123.271 54.0688 121.799 54.5801 117.474L55.8142 107.032Z" fill={Color["title-1"]}/>
                    <Rect x="44.1976" y="115.715" width="4.80603" height="8.05569" rx="2.40301" fill={Color["title-1"]}/>
                    <Rect x="36.0023" y="115.751" width="4.73081" height="8.05569" rx="2.36541" fill={Color["title-1"]}/>
                    <Rect x="40.7762" y="116.458" width="3.49931" height="7.61646" rx="1.74966" fill={Color["system-white"]}/>
                </G>
                <Ellipse cx="10.4999" cy="87" rx="10.5" ry="20" fill={Color["title-1"]}/>
                <Ellipse cx="77.9999" cy="79" rx="15" ry="20" fill={Color["title-1"]}/>
                <Rect x="0.00012207" y="29" width="122" height="60" rx="20" fill={Color["title-1"]}/>
                <Circle cx="102" cy="88" r="20" fill={Color["title-1"]}/>
                <Ellipse cx="87" cy="60" rx="30" ry="27" fill={Color["title-1"]}/>
                <Ellipse cx="43.544" cy="30.8434" rx="26" ry="8" transform="rotate(29.7383 43.544 30.8434)" fill={Color["title-1"]}/>
                <Ellipse cx="60.588" cy="25.8837" rx="34.5942" ry="10.8019" transform="rotate(151.763 60.588 25.8837)" fill={Color["title-1"]}/>
                <Path d="M21.4656 106.418C18.0686 109.268 17.5113 105.385 14.6713 102C11.8312 98.6154 7.78403 97.0114 11.181 94.161C14.5779 91.3107 19.634 91.7438 22.474 95.1284C25.314 98.513 24.8625 103.567 21.4656 106.418Z" fill={ribbonPrimaryColor}/>
                <Path d="M39.4352 91.0341C42.8321 88.1838 38.8399 86.8952 35.9999 83.5106C33.1599 80.126 32.5475 75.9271 29.1506 78.7774C25.7536 81.6278 25.3022 86.6822 28.1422 90.0668C30.9822 93.4514 36.0382 93.8845 39.4352 91.0341Z" fill={ribbonPrimaryColor}/>
                <Circle cx="24.9999" cy="92" r="6" fill={ribbonSecondaryColor}/>
            </Svg>
        </View>
    )
}