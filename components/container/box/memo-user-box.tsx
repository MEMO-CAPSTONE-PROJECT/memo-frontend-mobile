import { Color } from "@/constants/theme/color";
import { User } from "phosphor-react-native";
import { View } from "react-native";

interface MemoUserBoxProps {
    size?: keyof MemoUserBoxSize
    variant?: keyof MemoUserBoxVariant
    children?: React.ReactNode
}

interface MemoUserBoxSize {
    large: string
    medium: string
    small: string
}

interface MemoUserBoxVariant {
    primary: string
}

export default function MemoUserBox({ size ="medium", variant = "primary", children }: Readonly<MemoUserBoxProps>) {
    const sizes = {
        large: { container: "w-24 h-24", icon: 32 },
        medium: { container: "w-16 h-16", icon: 24 },
        small: { container: "w-12 h-12", icon: 20 },
    }
    const variants = {
        primary: { container: "bg-system-light-blue" },
    }
    const { container: variantContainer } = variants[variant]
    const { container: sizeContainer, icon } = sizes[size]
    return (
        <View className={` rounded-circle justify-center items-center ${variantContainer} ${sizeContainer}`}>
            {children ? children : <User color={Color["title-1"]} size={icon}/>}
        </View>
    )
}