import { Color } from "@/constants/theme/color";
import { Icon } from "phosphor-react-native";
import { Text, TouchableOpacity } from "react-native";

interface MemoIconTextButtonProps {
    name: string
    icon: Icon
    variant: keyof MemoIconTextBoxVariant
    disabled?: boolean
    onPress?: () => void
}

interface MemoIconTextBoxVariant {
    primary: string
    secondary: string
    orange: string
    disabled: string
    darkRed: string
}

export default function MemoIconTextButton({ name, icon: Icon, variant = "primary", disabled = false, onPress }: Readonly<MemoIconTextButtonProps>) {

    const variants = {
        primary: { container: "bg-primary-3", iconColor: Color["system-white"], textColor: "text-system-white" },
        secondary: { container: "bg-primary-2", iconColor: Color["system-white"], textColor: "text-system-white" },
        orange: { container: "bg-secondary-2", iconColor: Color["system-white"], textColor: "text-system-white" },
        darkRed: { container: "bg-secondary-3", iconColor: Color["system-white"], textColor: "text-system-white" },
        disabled: { container: "bg-system-gray", iconColor: Color["system-white"], textColor: "text-system-white" },
    }

    const { container, iconColor, textColor } = disabled ? variants.disabled : variants[variant] 

    return (
        <TouchableOpacity 
            className={`${container} flex-row justify-between items-center rounded-xsm p-md gap-x-sm`} 
            onPress={onPress}
            disabled={disabled}
        >
            <Icon size={24} color={iconColor} />
            <Text className={`flex-1 font-kanit-medium text-body text-center ${textColor}`}>{name}</Text>
        </TouchableOpacity>
    )
}