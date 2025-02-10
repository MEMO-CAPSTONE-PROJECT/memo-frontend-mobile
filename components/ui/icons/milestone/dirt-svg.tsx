import { Color } from "@/constants/theme/color";
import Svg, { Path } from "react-native-svg";

interface DirtSvgProps {
    width: number
    height: number
}

export default function DirtSvg({ width, height }: Readonly<DirtSvgProps>) {
    return (
        <Svg width={width} height={height} viewBox="0 0 50 10" fill="none">
            <Path d="M0 10C0 4.47715 4.47715 0 10 0H40C45.5228 0 50 4.47715 50 10V10H0V10Z" fill={Color["system-dark-brown"]}/>
        </Svg>
    )
}