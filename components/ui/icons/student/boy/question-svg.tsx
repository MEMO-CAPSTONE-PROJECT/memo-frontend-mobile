import { ContainerSize } from "@/constants/container-size";
import { Color } from "@/constants/theme/color";
import { ContainerType } from "@/shared/types/container-type";
import { View } from "react-native";
import Svg, { Circle, Ellipse, G, Mask, Path, Rect } from "react-native-svg";

interface StudentBoyQuestionSvgProps {
    size: number
    className?: string
    flip?: boolean
    container?: keyof ContainerType
}

export default function StudentBoyQuestionSvg({ size, className = "", flip = false, container = "none" }: Readonly<StudentBoyQuestionSvgProps>) {
    return (
        <View className={`${ContainerSize[container]} ${className} ${flip ? "transform scale-x-[-1]" : ""}`}>
            <Svg width={size} height={size} viewBox="0 0 178 180" fill="none">
                <Rect x="26.3229" y="57" width="102" height="90" rx="30" fill={Color["secondary-4"]} />
                <Path d="M71.3229 131C71.3229 129.895 72.2183 129 73.3229 129H81.3229H89.3229C90.4274 129 91.3229 129.895 91.3229 131C91.3229 132.105 90.4274 133 89.3229 133H81.3229H73.3229C72.2183 133 71.3229 132.105 71.3229 131Z" fill={Color["system-white"]} />
                <Rect opacity="0.35" x="77.3229" y="114" width="8" height="10" rx="4" fill={Color["secondary-3"]} />
                <Path opacity="0.35" d="M38.3229 126.5C38.3229 125.119 39.4422 124 40.8229 124C42.2036 124 43.3229 125.119 43.3229 126.5C43.3229 127.881 42.2036 129 40.8229 129C39.4422 129 38.3229 127.881 38.3229 126.5Z" fill={Color["secondary-3"]} />
                <Rect opacity="0.35" x="43.3229" y="130" width="4" height="4" rx="2" fill={Color["secondary-3"]} />
                <Rect x="90.3229" y="101" width="28" height="30" rx="14" fill={Color["system-white"]} />
                <Rect x="90.3229" y="97" width="28" height="24" rx="7" fill={Color["system-white"]} />
                <Mask id="mask0_512_273" maskUnits="userSpaceOnUse" x="98" y="115" width="14" height="13">
                    <Rect x="98.3229" y="115" width="13" height="13" rx="6.5" fill={Color["system-white"]} />
                </Mask>
                <G mask="url(#mask0_512_273)">
                    <Rect x="90.3229" y="111" width="28" height="17.7273" rx="8.86364" fill={Color["title-1"]} />
                </G>
                <Rect x="44.3229" y="101" width="28" height="30" rx="14" fill={Color["system-white"]} />
                <Rect x="44.3229" y="97" width="28" height="23" rx="7" fill={Color["system-white"]} />
                <Mask id="mask1_512_273" maskUnits="userSpaceOnUse" x="52" y="118" width="14" height="13">
                    <Rect x="52.3229" y="118" width="13" height="13" rx="6.5" fill={Color["system-white"]} />
                </Mask>
                <G mask="url(#mask1_512_273)">
                    <Rect x="44.3229" y="109.5" width="28" height="17.7273" rx="8.86364" fill={Color["title-1"]} />
                </G>
                <Circle cx="58.323" cy="79" r="20" fill={Color["title-1"]} />
                <Rect x="16.323" y="29" width="122" height="60" rx="20" fill={Color["title-1"]} />
                <Ellipse cx="116.826" cy="79.007" rx="34.5942" ry="14.6495" transform="rotate(-124.595 116.826 79.007)" fill={Color["title-1"]} />
                <Ellipse cx="34.5942" cy="14.6495" rx="34.5942" ry="14.6495" transform="matrix(0.567771 -0.823186 -0.823186 -0.567771 26.4417 122.59)" fill={Color["title-1"]} />
                <Ellipse cx="121.984" cy="68.5001" rx="34.5942" ry="10.8019" transform="rotate(-136.978 121.984 68.5001)" fill={Color["title-1"]} />
                <Ellipse cx="34.5942" cy="10.8019" rx="34.5942" ry="10.8019" transform="matrix(0.731091 -0.68228 -0.68228 -0.731091 15.0627 99.0002)" fill={Color["title-1"]} />
                <Circle cx="91.3229" cy="82" r="20" fill={Color["title-1"]} />
                <Ellipse cx="103.323" cy="60" rx="30" ry="27" fill={Color["title-1"]} />
                <Ellipse cx="35.4254" cy="86.5114" rx="15.5" ry="9" transform="rotate(-47.5494 35.4254 86.5114)" fill={Color["title-1"]} />
                <Ellipse cx="59.8669" cy="30.8434" rx="26" ry="8" transform="rotate(29.7383 59.8669 30.8434)" fill={Color["title-1"]} />
                <Ellipse cx="76.9109" cy="25.8837" rx="34.5942" ry="10.8019" transform="rotate(151.763 76.9109 25.8837)" fill={Color["title-1"]} />
                <Path d="M135.581 142.04L135.95 141.248C136.971 139.059 137.964 137.399 138.931 136.267C139.911 135.141 140.938 134.35 142.012 133.895C143.092 133.427 144.294 133.102 145.617 132.919C146.668 132.783 147.632 132.597 148.509 132.364C149.405 132.123 150.184 131.781 150.845 131.337C151.507 130.893 152.021 130.279 152.387 129.494C152.741 128.734 152.873 127.98 152.783 127.233C152.692 126.486 152.404 125.81 151.917 125.207C151.449 124.597 150.836 124.115 150.076 123.761C149.316 123.407 148.521 123.247 147.689 123.283C146.871 123.324 146.099 123.568 145.374 124.013C144.668 124.452 144.098 125.119 143.665 126.014L134.782 121.872C136.082 119.187 137.738 117.264 139.753 116.103C141.78 114.948 143.99 114.427 146.383 114.539C148.781 114.639 151.191 115.253 153.611 116.382C156.263 117.618 158.427 119.129 160.102 120.913C161.791 122.704 162.852 124.68 163.286 126.841C163.72 129.003 163.394 131.249 162.307 133.579C161.593 135.111 160.705 136.342 159.644 137.274C158.583 138.205 157.378 138.905 156.031 139.374C154.703 139.836 153.25 140.146 151.672 140.304C150.442 140.42 149.361 140.637 148.43 140.955C147.511 141.278 146.704 141.764 146.01 142.412C145.322 143.048 144.711 143.938 144.177 145.084L143.807 145.876L135.581 142.04ZM133.942 156.697C132.551 156.049 131.589 155.004 131.054 153.564C130.531 152.129 130.601 150.72 131.262 149.335C131.886 147.965 132.912 147.025 134.34 146.516C135.788 145.999 137.207 146.065 138.597 146.714C139.923 147.332 140.86 148.365 141.408 149.811C141.962 151.245 141.927 152.647 141.304 154.018C140.859 154.939 140.221 155.668 139.39 156.205C138.573 156.749 137.679 157.069 136.709 157.165C135.753 157.267 134.83 157.112 133.942 156.697Z" fill="#605E5C" />
            </Svg>

        </View>
    )
}