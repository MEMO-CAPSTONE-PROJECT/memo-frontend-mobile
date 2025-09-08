import { Color } from "@/constants/theme/color";
import Svg, { Ellipse, Path, Rect } from "react-native-svg";

interface MilestoneTreeAptitudeCompetitionSvgProps {
    size: number
}

export default function MilestoneTreeAptitudeCompetitionSvg({ size }: Readonly<MilestoneTreeAptitudeCompetitionSvgProps>) {
    const primary = Color["primary-2"]
    const secondary = Color["primary-2-hover"]
    return (
        <Svg width={size} height={size} viewBox="0 0 248 330" fill="none">
            <Path d="M117 143.5C117 139.358 120.358 136 124.5 136C128.642 136 132 139.358 132 143.5V330H117V143.5Z" fill={Color["system-brown"]} />
            <Path d="M175.563 159.074C178.623 156.282 183.367 156.5 186.158 159.561C188.95 162.621 188.732 167.364 185.672 170.156L132.109 219.015L122 207.933L175.563 159.074Z" fill={Color["system-brown"]} />
            <Path d="M88.6499 154.496C85.5897 151.704 80.8459 151.922 78.0545 154.982C75.263 158.043 75.4808 162.786 78.5411 165.578L117.328 200.959L127.437 189.877L88.6499 154.496Z" fill={Color["system-brown"]} />
            <Rect width="254.651" height="96.6514" rx="48.3257" transform="matrix(-0.999987 0.00516449 -0.00365079 -0.999993 255 167.685)" fill={primary} />
            <Ellipse cx="152.913" cy="71.6466" rx="61.2682" ry="71.6466" fill={primary} />
            <Ellipse cx="73.6247" cy="75.933" rx="37.5847" ry="44.0902" fill={primary} />
            <Rect width="108.851" height="41.1769" rx="20.5885" transform="matrix(-0.999987 0.00514739 -0.00366292 -0.999993 244 178.439)" fill={secondary} />
            <Ellipse cx="200.363" cy="137.524" rx="26.1892" ry="30.524" fill={secondary} />
            <Ellipse cx="166.471" cy="139.35" rx="16.0656" ry="18.784" fill={secondary} />
        </Svg>
    )
}