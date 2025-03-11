import { Color } from "@/constants/theme/color"
import Svg, { Circle, Path, Rect } from "react-native-svg"

interface CrownSvgProps {
    width: number
    height: number
    variant?: keyof CrownSvgVariant
}

interface CrownSvgVariant {
    gold: string
    silver: string
    bronze: string
}

export default function CrownSvg({ variant = "gold", width, height }: Readonly<CrownSvgProps>) {
    const variants = {
        gold: { primary: Color["secondary-1"], secondary: Color["secondary-2"], crystal: Color["system-error-2"] },
        silver: { primary: Color["system-gray"], secondary: Color["body-2"], crystal: Color["system-blue"] },
        bronze: { primary: Color["system-brown"], secondary: Color["primary-3"], crystal: Color["primary-3"] },
    }
    const { primary, secondary, crystal } = variants[variant]
    return (
        <Svg width={width} height={height} viewBox="0 0 46 38" fill="none">
            <Rect x="5" y="31.6309" width="36" height="6" rx="1.5" fill={primary} />
            <Rect x="5" y="18.1309" width="36" height="10.5" rx="3" fill={primary} />
            <Path d="M3.5 11.5854C3.5 11.0582 3.92736 10.6309 4.45455 10.6309C9.72635 10.6309 14 14.9045 14 20.1763V30.6763C14 31.2035 13.5726 31.6309 13.0455 31.6309C7.77365 31.6309 3.5 27.3572 3.5 22.0854V11.5854Z" fill={primary} />
            <Path d="M42.5 11.5854C42.5 11.0582 42.0726 10.6309 41.5455 10.6309C36.2736 10.6309 32 14.9045 32 20.1763V30.6763C32 31.2035 32.4274 31.6309 32.9545 31.6309C38.2264 31.6309 42.5 27.3572 42.5 22.0854V11.5854Z" fill={primary} />
            <Path d="M24.3497 4.19152C23.7639 3.60573 22.8142 3.60573 22.2284 4.19152L20.1071 6.31284C14.2492 12.1707 14.2492 21.6682 20.1071 27.526L22.2284 29.6474C22.8142 30.2331 23.7639 30.2331 24.3497 29.6474L26.471 27.526C32.3289 21.6682 32.3289 12.1707 26.471 6.31284L24.3497 4.19152Z" fill={primary} />
            <Path d="M24.4239 13.1915C23.8382 12.6057 22.8884 12.6057 22.3026 13.1915C19.3737 16.1205 19.3737 20.8692 22.3026 23.7981C22.8884 24.3839 23.8382 24.3839 24.4239 23.7981C27.3529 20.8692 27.3529 16.1205 24.4239 13.1915Z" fill={crystal} />
            <Path d="M9.77252 18.6612C9.47962 18.3683 9.00475 18.3683 8.71186 18.6612C7.24739 20.1257 7.24739 22.5 8.71186 23.9645C9.00475 24.2574 9.47962 24.2574 9.77252 23.9645C11.237 22.5 11.237 20.1257 9.77252 18.6612Z" fill={crystal} />
            <Path d="M38.2725 18.6612C37.9796 18.3683 37.5048 18.3683 37.2119 18.6612C35.7474 20.1257 35.7474 22.5 37.2119 23.9645C37.5048 24.2574 37.9796 24.2574 38.2725 23.9645C39.737 22.5 39.737 20.1257 38.2725 18.6612Z" fill={crystal} />
            <Rect x="6.5" y="28.6309" width="33" height="3" fill={secondary}/>
            <Circle cx="3.5" cy="9.13086" r="3" fill={primary} />
            <Circle cx="42.5" cy="9.13086" r="3" fill={primary} />
            <Circle cx="23" cy="3.13086" r="3" fill={primary} />
        </Svg>
    )
}