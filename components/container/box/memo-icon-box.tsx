import { Color } from "@/constants/theme/color"
import { Icon, IconWeight } from "phosphor-react-native"
import { View } from "react-native"

interface MemoIconBoxProps {
    icon: Icon
    variant?: keyof MemoIconBoxVariant
    size?: keyof MemoIconBoxSize
}

interface MemoIconBoxSize {
    large: string
    medium: string
    small: string
}

export interface MemoIconBoxVariant {
    primary: string
    darkPrimary: string
    secondary: string
}

export default function MemoIconBox({ variant = "primary", size = "large", icon: Icon }: Readonly<MemoIconBoxProps>) {
    const variants = {
        primary: { container: "bg-system-light-purple", iconColor: Color["primary-2"], weight: "fill" },
        darkPrimary: { container: "bg-primary-2", iconColor: Color["system-white"], weight: undefined },
        secondary: { container: "bg-system-light-orange", iconColor: Color["secondary-3"], weight: "fill" },
    }
    const sizes = {
        large: { box: "w-[40] h-[40]", icon: 30 },
        medium: { box: "w-[30] h-[30]", icon: 24 },
        small: { box: "w-[20] h-[20]", icon: 16 },
    }
    const { container, iconColor, weight } = variants[variant]
    const { box, icon } = sizes[size]
    return (
      <View className={`${container} ${box} rounded-xsm justify-center items-center`}>
          <Icon size={icon} weight={weight as IconWeight} color={iconColor}/>
      </View>
    )
}