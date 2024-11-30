import { Color } from "@/constants/theme/color";
import Svg, { Path } from "react-native-svg";

interface AptitudeTierSilverSvgProps {
    size: number
    className?: string
}

export default function AptitudeTierSilverSvg({ size, className }: Readonly<AptitudeTierSilverSvgProps>) {
    return (
        <Svg width={size} height={size} viewBox="0 0 140 175" fill="none" className={className}>
            <Path d="M67 171.333C71 176.667 79 176.667 83 171.333L138 98C142.944 91.4076 138.24 82 130 82H20C11.7595 82 7.05573 91.4076 12 98L67 171.333Z" fill={Color["body-1"]} />
            <Path d="M67 12.6667C71 7.33333 79 7.33333 83 12.6667L138 86C142.944 92.5924 138.24 102 130 102H20C11.7595 102 7.05573 92.5924 12 86L67 12.6667Z" fill={Color["body-2"]} />
            <Path d="M10 92C10 91.4477 10.4477 91 11 91H139C139.552 91 140 91.4477 140 92C140 97.5228 135.523 102 130 102H20C14.4772 102 10 97.5228 10 92Z" fill={Color["body-1"]} />
            <Path d="M71 25.3333C73 22.6667 77 22.6667 79 25.3333L126 88C128.472 91.2962 126.12 96 122 96H28C23.8798 96 21.5279 91.2962 24 88L71 25.3333Z" fill={Color["system-gray"]} />
            <Path d="M71 156.667C73 159.333 77 159.333 79 156.667L126 94C128.472 90.7038 126.12 86 122 86H28C23.8798 86 21.5279 90.7038 24 94L71 156.667Z" fill={Color["body-2"]} />
            <Path d="M72 140.25C73.5 142.25 76.5 142.25 78 140.25L113.25 93.25C115.104 90.7779 113.34 87.25 110.25 87.25H39.75C36.6598 87.25 34.8959 90.7779 36.75 93.25L72 140.25Z" fill={Color["system-gray"]} />
            <Path d="M72 41.75C73.5 39.75 76.5 39.75 78 41.75L113.25 88.75C115.104 91.2221 113.34 94.75 110.25 94.75H39.75C36.6598 94.75 34.8959 91.2221 36.75 88.75L72 41.75Z" fill={Color["system-lightest-gray"]} />
        </Svg>
    )
}