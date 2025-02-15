import { Color } from "@/constants/theme/color";
import Svg, { Ellipse } from "react-native-svg";

interface SeedSvgProps {
    size: number
    color?: string
}

export default function SeedSvg({ size, color = Color["grass-green"] }: Readonly<SeedSvgProps>) {
    return (
        <Svg width={size} height={size} viewBox="0 0 25 10" fill="none">
            <Ellipse cx="12.5" cy="10" rx="12.5" ry="10" fill={color}/>
        </Svg>
    )
}