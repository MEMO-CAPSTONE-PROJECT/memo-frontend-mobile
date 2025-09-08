import { Color } from "@/constants/theme/color";
import Svg, { Path, Rect } from "react-native-svg";

interface MilestoneTreeStageOneSvgProps {
    color?: string
    size: number
}

export default function MilestoneTreeStageOneSvg({ size, color = Color["grass-green"] }: Readonly<MilestoneTreeStageOneSvgProps>) {
    return (
        <Svg width={size} height={size} viewBox="0 0 80 60" fill="none">
            <Rect x="32" y="40" width="15" height="30" fill={color}/>
            <Path d="M0 5C0 2.23858 2.23858 0 5 0H10C26.5685 0 40 13.4315 40 30V40H30C13.4315 40 0 26.5685 0 10V5Z" fill={color}/>
            <Path d="M80 5C80 2.23858 77.7614 0 75 0H70C53.4315 0 40 13.4315 40 30V40H50C66.5685 40 80 26.5685 80 10V5Z" fill={color}/>
        </Svg>
    )
}