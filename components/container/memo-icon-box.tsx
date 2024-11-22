import { Color } from "@/constants/theme/color"
import { Icon } from "phosphor-react-native"
import { View } from "react-native"

interface MemoIconBoxProps {
    icon: Icon
    variant?: keyof MemoIconBoxVariant
}

interface MemoIconBoxVariant {
    primary: string
    secondary: string
}

export default function MemoIconBox({ variant = "primary", icon: Icon }: Readonly<MemoIconBoxProps>) {
    const variants = {
        primary: { container: "bg-system-light-purple", iconColor: Color["primary-2"] },
        secondary: { container: "bg-system-light-orange", iconColor: Color["secondary-3"] },
    }
    const { container, iconColor } = variants[variant]
    return (
      <View className={`${container} rounded-xsm w-[40] h-[40] justify-center items-center`}>
          <Icon size={30} weight="fill" color={iconColor}/>
      </View>
    )
}