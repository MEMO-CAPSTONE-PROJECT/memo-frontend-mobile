import { Color } from "@/constants/theme/color";
import Svg, { Ellipse } from "react-native-svg";

interface SeedSvgProps {
    size: number
}

export default function SeedSvg({ size }: Readonly<SeedSvgProps>) {
    return (
        <Svg width={size} height={size} viewBox="0 0 25 20" fill="none">
            <Ellipse cx="12.5" cy="10" rx="12.5" ry="10" fill={Color["grass-green"]}/>
        </Svg>
    )
}