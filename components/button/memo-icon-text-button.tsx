import { Color } from "@/constants/theme/color";
import { Icon } from "phosphor-react-native";
import { Text, TouchableOpacity } from "react-native";

interface MemoIconTextButtonProps {
    name: string
    icon: Icon
    variant: keyof MemoIconTextBoxVariant
    onPress?: () => void
}

interface MemoIconTextBoxVariant {
    primary: string
    secondary: string
    darkRed: string
}

export default function MemoIconTextButton({ name, icon: Icon, variant = "primary", onPress }: Readonly<MemoIconTextButtonProps>) {

    const variants = {
        primary: { container: "bg-primary-3", iconColor: Color["system-white"], textColor: "text-system-white" },
        secondary: { container: "bg-primary-2", iconColor: Color["system-white"], textColor: "text-system-white" },
        darkRed: { container: "bg-secondary-3", iconColor: Color["system-white"], textColor: "text-system-white" },
    }

    const { container, iconColor, textColor } = variants[variant]

    return (
        <TouchableOpacity 
            className={`${container} flex-row justify-center items-center rounded-xsm px-md py-sm gap-x-sm`} 
            onPress={onPress}
        >
            <Icon size={24} color={iconColor} />
            <Text className={`font-kanit-medium text-caption-1 ${textColor}`}>{name}</Text>
        </TouchableOpacity>
    )
}