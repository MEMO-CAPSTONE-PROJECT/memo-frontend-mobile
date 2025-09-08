import Svg, { Path } from "react-native-svg";

interface MilestoneTreeStageFourSvgProps {
    size: number
}

export default function MilestoneTreeStageFourSvg({ size }: Readonly<MilestoneTreeStageFourSvgProps>) {
    return (
        <Svg width={size} height={size} viewBox="0 0 162 330" fill="none">
            <Path d="M0 30C0 13.4315 13.4315 0 30 0H130C146.569 0 160 13.4315 160 30V190C160 206.569 146.569 220 130 220H30C13.4315 220 0 206.569 0 190V30Z" fill="#A6CE39" />
            <Path d="M73 122.5C73 118.358 76.3579 115 80.5 115C84.6421 115 88 118.358 88 122.5V330H73V122.5Z" fill="#82685E" />
            <Path d="M47.3033 153.91C44.3744 150.981 44.3744 146.232 47.3033 143.303C50.2322 140.374 54.981 140.374 57.9099 143.303L87.9619 173.355L77.3553 183.962L47.3033 153.91Z" fill="#82685E" />
            <Path d="M113.659 153.91C116.588 150.981 116.588 146.232 113.659 143.303C110.73 140.374 105.981 140.374 103.052 143.303L73 173.355L83.6066 183.962L113.659 153.91Z" fill="#82685E" />
        </Svg>
    )
}
