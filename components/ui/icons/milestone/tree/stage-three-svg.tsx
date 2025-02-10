import { Color } from "@/constants/theme/color"
import Svg, { Path, Rect } from "react-native-svg"

interface MilestoneTreeStageThreeSvgProps {
    size: number
}

export default function MilestoneTreeStageThreeSvg({ size }: Readonly<MilestoneTreeStageThreeSvgProps>) {
    return (
        <Svg width={size} height={size} viewBox="0 0 115 212" fill="none">
            <Rect x="50" y="50" width="15" height="162" fill={Color["system-brown"]}/>
            <Path d="M0 125C0 122.239 2.23858 120 5 120H20C36.5685 120 50 133.431 50 150V170H30C13.4315 170 0 156.569 0 140V125Z" fill={Color["grass-green"]}/>
            <Path d="M115 125C115 122.239 112.761 120 110 120H95C78.4315 120 65 133.431 65 150V170H85C101.569 170 115 156.569 115 140V125Z" fill={Color["grass-green"]}/>
            <Path d="M0 65C0 62.2386 2.23858 60 5 60H20C36.5685 60 50 73.4315 50 90V110H30C13.4315 110 0 96.5685 0 80V65Z" fill={Color["grass-green"]}/>
            <Path d="M115 65C115 62.2386 112.761 60 110 60H95C78.4315 60 65 73.4315 65 90V110H85C101.569 110 115 96.5685 115 80V65Z" fill={Color["grass-green"]}/>
            <Path d="M0 5C0 2.23858 2.23858 0 5 0H20C36.5685 0 50 13.4315 50 30V50H30C13.4315 50 0 36.5685 0 20V5Z" fill={Color["grass-green"]}/>
            <Path d="M115 5C115 2.23858 112.761 0 110 0H95C78.4315 0 65 13.4315 65 30V50H85C101.569 50 115 36.5685 115 20V5Z" fill={Color["grass-green"]}/>
        </Svg>
        
    )
}
