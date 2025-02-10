import { Color } from "@/constants/theme/color"
import Svg, { Path, Rect } from "react-native-svg"

interface MilestoneTreeStageTwoSvgProps {
    size: number
}

export default function MilestoneTreeStageTwoSvg({ size }: Readonly<MilestoneTreeStageTwoSvgProps>) {
    return (
        <Svg width={size} height={size} viewBox="0 0 95 110" fill="none">
            <Path d="M0 55C0 52.2386 2.23858 50 5 50H15C28.8071 50 40 61.1929 40 75V90H25C11.1929 90 0 78.8071 0 65V55Z" fill={Color["grass-green"]}/>
            <Path d="M95 55C95 52.2386 92.7614 50 90 50H80C66.1929 50 55 61.1929 55 75V90H70C83.8071 90 95 78.8071 95 65V55Z" fill={Color["grass-green"]}/>
            <Path d="M8 5C8 2.23858 10.2386 0 13 0H23C36.8071 0 48 11.1929 48 25V40H33C19.1929 40 8 28.8071 8 15V5Z" fill={Color["grass-green"]}/>
            <Path d="M88 5C88 2.23858 85.7614 0 83 0H73C59.1929 0 48 11.1929 48 25V40H63C76.8071 40 88 28.8071 88 15V5Z" fill={Color["grass-green"]}/>
            <Rect x="40" y="40" width="15" height="70" fill={Color["grass-green"]}/>
        </Svg>
    )
}