import { ContainerSize } from "@/constants/container-size";
import { Color } from "@/constants/theme/color";
import { ContainerType } from "@/shared/types/container-type";
import { View } from "react-native";
import Svg, { Circle, Ellipse, G, Mask, Path, Rect } from "react-native-svg";

interface StudentBoyHappySvgProps {
    size?: number
    width?: number
    height?: number
    className?: string
    flip?: boolean
    container?: keyof ContainerType
    skinColor?: string
    hairColor?: string
}

export default function StudentBoyHappySvg({ 
    size, 
    width, 
    height, 
    className = "", 
    flip = false, 
    container = "none",
    skinColor = Color["secondary-4"],
    hairColor = Color["title-1"]
}: Readonly<StudentBoyHappySvgProps>) {
    return (
        <View className={`${ContainerSize[container]} ${className} ${flip ? "transform scale-x-[-1]" : ""}`}>
            <Svg width={width ?? size} height={height ?? size} viewBox="0 0 155 147" fill="none">
                <Rect x="26" y="57" width="102" height="90" rx="30" fill={skinColor} />
                <Path d="M71 130C71 127.791 72.7909 126 75 126H81H87C89.2091 126 91 127.791 91 130V132C91 134.209 89.2091 136 87 136H81H75C72.7909 136 71 134.209 71 132V130Z" fill={Color["system-white"]} />
                <Rect opacity="0.35" x="77" y="114" width="8" height="10" rx="4" fill={Color["secondary-3"]} />
                <Path opacity="0.35" d="M38 126.5C38 125.119 39.1193 124 40.5 124C41.8807 124 43 125.119 43 126.5C43 127.881 41.8807 129 40.5 129C39.1193 129 38 127.881 38 126.5Z" fill={Color["secondary-3"]} />
                <Rect opacity="0.35" x="43" y="130" width="4" height="4" rx="2" fill={Color["secondary-3"]} />
                <Rect x="90" y="101" width="28" height="30" rx="14" fill={Color["system-white"]} />
                <Rect x="90" y="97" width="28" height="24" rx="7" fill={Color["system-white"]} />
                <Mask id="mask0_1444_5345" maskUnits="userSpaceOnUse" x="98" y="112" width="13" height="17">
                    <Rect width="13" height="16.9548" rx="6.5" transform="matrix(-1 0 0 1 111 112)" fill={Color["system-white"]}/>
                </Mask>
                <G mask="url(#mask0_1444_5345)">
                    <Path d="M117.814 107.032C118.445 101.693 114.274 97 108.898 97H100.819C95.4956 97 91.2735 101.487 91.5974 106.801L92.1602 116.034C92.4188 120.278 97.5347 122.266 100.591 119.311L100.731 119.176C102.82 117.156 106.21 117.436 107.939 119.771C110.531 123.271 116.069 121.799 116.58 117.474L117.814 107.032Z" fill={Color["title-1"]}/>
                    <Rect x="106.198" y="115.715" width="4.80603" height="8.05569" rx="2.40301" fill={Color["title-1"]}/>
                    <Rect x="98.0023" y="115.751" width="4.73081" height="8.05569" rx="2.36541" fill={Color["title-1"]}/>
                    <Rect x="102.776" y="116.458" width="3.49931" height="7.61646" rx="1.74966" fill={Color["system-white"]}/>
                </G>
                <Rect x="44" y="101" width="28" height="30" rx="14" fill={Color["system-white"]} />
                <Rect x="44" y="97" width="28" height="23" rx="7" fill={Color["system-white"]} />
                <Mask id="mask1_1444_5345" maskUnits="userSpaceOnUse" x="52" y="112" width="13" height="17">
                    <Rect width="13" height="16.9548" rx="6.5" transform="matrix(-1 0 0 1 65 112)" fill={Color["system-white"]}/>
                </Mask>
                <G mask="url(#mask1_1444_5345)">
                    <Path d="M71.8142 107.032C72.4453 101.693 68.2742 97 62.8977 97H54.8192C49.4956 97 45.2735 101.487 45.5974 106.801L46.1602 116.034C46.4188 120.278 51.5347 122.266 54.5914 119.311L54.7308 119.176C56.8199 117.156 60.2095 117.436 61.9389 119.771C64.5308 123.271 70.0688 121.799 70.5801 117.474L71.8142 107.032Z" fill={Color["title-1"]}/>
                    <Rect x="60.1976" y="115.715" width="4.80603" height="8.05569" rx="2.40301" fill={Color["title-1"]}/>
                    <Rect x="52.0023" y="115.751" width="4.73081" height="8.05569" rx="2.36541" fill={Color["title-1"]}/>
                    <Rect x="56.7762" y="116.458" width="3.49931" height="7.61646" rx="1.74966" fill={Color["system-white"]}/>
                </G>
                <Circle cx="58.0001" cy="79" r="20" fill={hairColor} />
                <Rect x="16.0001" y="29" width="122" height="60" rx="20" fill={hairColor} />
                <Ellipse cx="116.503" cy="79.007" rx="34.5942" ry="14.6495" transform="rotate(-124.595 116.503 79.007)" fill={hairColor} />
                <Ellipse cx="34.5942" cy="14.6495" rx="34.5942" ry="14.6495" transform="matrix(0.567771 -0.823186 -0.823186 -0.567771 26.1188 122.59)" fill={hairColor} />
                <Ellipse cx="121.662" cy="68.5001" rx="34.5942" ry="10.8019" transform="rotate(-136.978 121.662 68.5001)" fill={hairColor} />
                <Ellipse cx="34.5942" cy="10.8019" rx="34.5942" ry="10.8019" transform="matrix(0.731091 -0.68228 -0.68228 -0.731091 14.7399 99.0002)" fill={hairColor} />
                <Circle cx="91" cy="82" r="20" fill={hairColor} />
                <Ellipse cx="103" cy="60" rx="30" ry="27" fill={hairColor} />
                <Ellipse cx="35.1025" cy="86.5114" rx="15.5" ry="9" transform="rotate(-47.5494 35.1025 86.5114)" fill={hairColor} />
                <Ellipse cx="59.544" cy="30.8434" rx="26" ry="8" transform="rotate(29.7383 59.544 30.8434)" fill={hairColor} />
                <Ellipse cx="76.588" cy="25.8837" rx="34.5942" ry="10.8019" transform="rotate(151.763 76.588 25.8837)" fill={hairColor} />
            </Svg>
        </View>
    )
}