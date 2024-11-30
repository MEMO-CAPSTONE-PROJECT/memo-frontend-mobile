import { Color } from "@/constants/theme/color";
import Svg, { Rect, Path } from "react-native-svg";

interface AptitudeTierWoodSvgProps {
    size: number
    className?: string
}

export default function AptitudeTierWoodSvg({ size, className }: Readonly<AptitudeTierWoodSvgProps>) {
    return (
        <Svg width={size} height={size} viewBox="0 0 140 175" fill="none" className={className}>
            <Path d="M67 171.333C71 176.667 79 176.667 83 171.333L138 98C142.944 91.4076 138.24 82 130 82H20C11.7595 82 7.05573 91.4076 12 98L67 171.333Z" fill={Color["system-dark-brown"]} />
            <Path d="M67 10.6667C71 5.33334 79 5.33333 83 10.6667L138 84C142.944 90.5924 138.24 100 130 100H20C11.7595 100 7.05573 90.5924 12 84L67 10.6667Z" fill={Color["system-dark-brown"]} />
            <Path d="M71 25.3333C73 22.6667 77 22.6667 79 25.3333L126 88C128.472 91.2962 126.12 96 122 96H28C23.8798 96 21.5279 91.2962 24 88L71 25.3333Z" fill={Color["system-brown"]} />
            <Path d="M71 156.667C73 159.333 77 159.333 79 156.667L126 94C128.472 90.7038 126.12 86 122 86H28C23.8798 86 21.5279 90.7038 24 94L71 156.667Z" fill={Color["system-brown"]} />
            <Path d="M71 25.3333C73 22.6667 77 22.6667 79 25.3333L126 88C128.472 91.2962 126.12 96 122 96H28C23.8798 96 21.5279 91.2962 24 88L71 25.3333Z" fill={Color["system-brown"]} />
            <Path d="M71 157.667C73 160.333 77 160.333 79 157.667L126 95C128.472 91.7038 126.12 87 122 87H28C23.8798 87 21.5279 91.7038 24 95L71 157.667Z" fill={Color["system-brown"]} />
            <Rect x="41" y="51" width="8" height="83" fill={Color["system-dark-brown"]} />
            <Rect x="101" y="51" width="8" height="83" fill={Color["system-dark-brown"]} />
            <Rect x="71" y="16" width="8" height="149" fill={Color["system-dark-brown"]} />
        </Svg>
    )
}