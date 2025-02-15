import { Color } from "@/constants/theme/color";
import Svg, { Ellipse, Path } from "react-native-svg";

interface DirtIslandSvgProps {
    width: number
    height: number
};

export default function DirtIslandSvg({ width, height }: Readonly<DirtIslandSvgProps>) {
    return (
        <Svg width={width} height={height} viewBox="0 0 247 99" fill="none">
            <Ellipse cx="123.5" cy="49.5" rx="123.5" ry="49.5" fill={Color["system-dark-brown"]} />
            <Ellipse cx="123.5" cy="42.5" rx="123.5" ry="42.5" fill={Color["grass-green"]} />
            <Ellipse cx="123.5" cy="40" rx="123.5" ry="40" fill={Color["grass-dark-green"]} />
            <Path d="M166 34.2593C166 44.3436 147.196 50 124 50C100.804 50 82 44.3436 82 34.2593C82 24.1749 100.804 16 124 16C147.196 16 166 24.1749 166 34.2593Z" fill={Color["system-dark-brown"]} />
        </Svg>
    )
}