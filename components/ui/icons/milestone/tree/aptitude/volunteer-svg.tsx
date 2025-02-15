import { Color } from "@/constants/theme/color";
import Svg, { Ellipse, Path } from "react-native-svg";

interface MilestoneTreeAptitudeVolunteerSvgProps {
    size: number
}

export default function MilestoneTreeAptitudeVolunteerSvg({ size }: Readonly<MilestoneTreeAptitudeVolunteerSvgProps>) {
    const primary = Color["system-blue"]
    const secondary = Color["system-blue-2"]
    return (
        <Svg width={size} height={size} viewBox="0 0 159 344" fill="none">
            <Path d="M158 146C158 194.049 123.802 223.5 81 223.5C38.1979 223.5 1 191.549 1 143.5C1 105.199 43.2553 39.0012 67.2378 11.9459C75.3159 2.83271 86.8887 2.52114 94.76 11.8135C118.018 39.27 158 107.873 158 146Z" fill={primary} />
            <Ellipse cx="79.5" cy="155" rx="79.5" ry="104.5" fill={primary} />
            <Path d="M63.0567 63.4389C63.0964 66.216 60.9701 67.949 58.2784 67.9875C55.5868 68.0259 53.2211 66.2127 53.1814 63.4356C53.1417 60.6584 57.2477 55.2841 58.0938 55.0697C58.944 55.1443 63.017 60.6618 63.0567 63.4389Z" fill={secondary} />
            <Ellipse cx="58.1276" cy="64.0299" rx="5" ry="6.04046" transform="rotate(-0.818868 58.1276 64.0299)" fill={secondary} />
            <Path d="M85.0567 36.4389C85.0964 39.216 82.9701 40.949 80.2784 40.9875C77.5868 41.0259 75.2211 39.2127 75.1814 36.4356C75.1417 33.6584 79.2477 28.2841 80.0938 28.0697C80.944 28.1443 85.017 33.6618 85.0567 36.4389Z" fill={secondary} />
            <Ellipse cx="80.1276" cy="37.0299" rx="5" ry="6.04046" transform="rotate(-0.818868 80.1276 37.0299)" fill={secondary} />
            <Path d="M106.057 63.4389C106.096 66.216 103.97 67.949 101.278 67.9875C98.5868 68.0259 96.2211 66.2127 96.1814 63.4356C96.1417 60.6584 100.248 55.2841 101.094 55.0697C101.944 55.1443 106.017 60.6618 106.057 63.4389Z" fill={secondary} />
            <Ellipse cx="101.128" cy="64.0299" rx="5" ry="6.04046" transform="rotate(-0.818868 101.128 64.0299)" fill={secondary} />
            <Path d="M72 157.5C72 153.358 75.3579 150 79.5 150C83.6421 150 87 153.358 87 157.5V344H72V157.5Z" fill={Color["system-brown"]} />
            <Path d="M46.3033 193.91C43.3744 190.981 43.3744 186.232 46.3033 183.303C49.2322 180.374 53.981 180.374 56.9099 183.303L86.9619 213.355L76.3553 223.962L46.3033 193.91Z" fill={Color["system-brown"]} />
            <Path d="M112.659 193.91C115.588 190.981 115.588 186.232 112.659 183.303C109.73 180.374 104.981 180.374 102.052 183.303L72 213.355L82.6066 223.962L112.659 193.91Z" fill={Color["system-brown"]} />
        </Svg>
    )
}