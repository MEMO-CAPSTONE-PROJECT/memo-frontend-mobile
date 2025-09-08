import Svg, { Circle, Path } from "react-native-svg";

interface CharacterBackgroundSvgProps {
    width?: number
    height?: number
    color: string
}

export default function CharacterBackgroundSvg({ width = 200, height = 200, color }: Readonly<CharacterBackgroundSvgProps>) {
    return (
        <Svg width={width} height={height} viewBox="0 0 200 200" fill="none" >
            <Path d="M42.5184 80.0862C67.2562 97.5906 97.5906 67.2562 80.0862 42.5184C67.4556 24.6687 80.2199 0 102.086 0H150H100C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100V150V102.086C0 80.2199 24.6687 67.4556 42.5184 80.0862Z" fill={color}/>
            <Circle cx="30.5" cy="58" r="5" stroke={color} strokeWidth="6"/>
            <Circle cx="70.5" cy="22" r="10" stroke={color} strokeWidth="10"/>
        </Svg>
    )
}