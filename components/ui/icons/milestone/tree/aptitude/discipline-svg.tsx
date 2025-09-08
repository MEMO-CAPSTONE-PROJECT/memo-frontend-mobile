import { Color } from "@/constants/theme/color";
import Svg, { Path } from "react-native-svg";

interface MilestoneTreeAptitudeDisciplineSvgProps {
    size: number
}

export default function MilestoneTreeAptitudeDisciplineSvg({ size }: Readonly<MilestoneTreeAptitudeDisciplineSvgProps>) {
    const primary = Color["system-error-2"]
    const secondary = Color["system-error-2-hover"]
    return (
        <Svg width={size} height={size} viewBox="0 0 172 355" fill="none">
            <Path d="M172 185.736C172 236.757 133.496 247 86 247C38.5035 247 0 236.757 0 185.736C0 134.715 38.5035 0 86 0C133.496 0 172 134.715 172 185.736Z" fill={primary} />
            <Path d="M90 116.52C90 118.585 88.433 119 86.5 119C84.567 119 83 118.585 83 116.52C83 114.454 84.567 109 86.5 109C88.433 109 90 114.454 90 116.52Z" fill={secondary} />
            <Path d="M62 140.52C62 142.585 60.433 143 58.5 143C56.567 143 55 142.585 55 140.52C55 138.454 56.567 133 58.5 133C60.433 133 62 138.454 62 140.52Z" fill={secondary} />
            <Path d="M115 145.52C115 147.585 113.433 148 111.5 148C109.567 148 108 147.585 108 145.52C108 143.454 109.567 138 111.5 138C113.433 138 115 143.454 115 145.52Z" fill={secondary} />
            <Path d="M78 147.5C78 143.358 81.3579 140 85.5 140C89.6421 140 93 143.358 93 147.5V355H78V147.5Z" fill={Color["system-brown"]} />
            <Path d="M41.2196 198.673C38.0103 196.055 37.5316 191.33 40.1504 188.121C42.7692 184.912 47.4937 184.433 50.703 187.052L89.1984 218.464L79.715 230.086L41.2196 198.673Z" fill={Color["system-brown"]} />
            <Path d="M107.35 163.554C110.41 160.763 115.154 160.981 117.946 164.041C120.737 167.101 120.519 171.845 117.459 174.636L87.858 201.638L77.7492 190.556L107.35 163.554Z" fill={Color["system-brown"]} />
        </Svg>
    )
}