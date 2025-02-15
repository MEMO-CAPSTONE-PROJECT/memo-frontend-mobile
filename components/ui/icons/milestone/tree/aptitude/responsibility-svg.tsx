import { Color } from "@/constants/theme/color";
import Svg, { Circle, Ellipse, Path } from "react-native-svg";

interface MilestoneTreeAptitudeResponsibilitySvgProps {
    size: number
}

export default function MilestoneTreeAptitudeResponsibilitySvg({ size }: Readonly<MilestoneTreeAptitudeResponsibilitySvgProps>) {
    const primary = Color["secondary-2-hover"]
    const secondary = Color["secondary-2"]
    return (
        <Svg width={size} height={size} viewBox="0 0 207 334" fill="none">
            <Ellipse cx="100" cy="154" rx="100" ry="95" fill={primary} />
            <Circle cx="100" cy="72" r="72" fill={primary} />
            <Circle cx="150" cy="54" r="5" fill={secondary} />
            <Circle cx="133" cy="59" r="5" fill={secondary} />
            <Circle cx="138" cy="38" r="5" fill={secondary} />
            <Path d="M96 126.5C96 122.358 99.3579 119 103.5 119C107.642 119 111 122.358 111 126.5V334H96V126.5Z" fill={Color["system-brown"]} />
            <Path d="M59.2196 177.673C56.0103 175.055 55.5316 170.33 58.1504 167.121C60.7692 163.912 65.4937 163.433 68.703 166.052L107.198 197.464L97.715 209.086L59.2196 177.673Z" fill={Color["system-brown"]} />
            <Path d="M125.35 142.554C128.41 139.763 133.154 139.981 135.946 143.041C138.737 146.101 138.519 150.845 135.459 153.636L105.858 180.638L95.7492 169.556L125.35 142.554Z" fill={Color["system-brown"]} />
        </Svg>
    )
}