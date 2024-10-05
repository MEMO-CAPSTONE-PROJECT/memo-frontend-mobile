import { Color } from "@/constants/theme/color";
import { CheckCircle, PencilSimpleSlash, XCircle } from "phosphor-react-native";
import { useMemo } from "react";
import { TextInput, View } from "react-native";

interface MemoTextInputProps {
    state?: "default" | "error" | "success" | "disabled"
    placeholder?: string
    className?: string
}

export default function MemoTextInput({ placeholder, state = "default", className }: MemoTextInputProps) {
    const { bgColor, placeholderColor, borderColor, textColor } = useMemo(() => {
        const classes = {
            default: { borderColor: undefined, bgColor: "bg-system-light-gray", placeholderColor: Color["title-3"], textColor: "text-title-1" },
            error: { borderColor: "border-system-error", bgColor: "bg-system-error-light", placeholderColor: Color["system-error"], textColor: "text-system-error" },
            success: { borderColor: "border-system-success", bgColor: "bg-system-success-light", placeholderColor: Color["system-success"], textColor: "text-system-success" },
            disabled: { borderColor: "border-title-3", bgColor: "bg-system-gray", placeholderColor: Color["title-3"], textColor: "text-title-3" },
        }
        return classes[state]
    }, [state])
    const DecorationIcon = useMemo(() => {
        const icons = {
            default: <></>,
            error: <XCircle size={24} weight="bold" color={Color["system-error"]}/>,
            success: <CheckCircle size={24} weight="bold" color={Color["system-success"]}/>,
            disabled: <PencilSimpleSlash size={24} weight="bold" color={Color["title-3"]}/>,
        }
        return icons[state]
    }, [state])
    return (
        <View className={`flex-row justify-between items-center px-3 h-[52px]  rounded-sm ${borderColor ? `border-2 ${borderColor}` : ""}  ${bgColor} ${placeholderColor} ${className}`}>
            <TextInput 
                placeholder={placeholder}
                placeholderTextColor={placeholderColor}
                className={`font-kanit-medium ${textColor}`}
                editable={state !== "disabled"}
                selectTextOnFocus={state !== "disabled"}
            />  
           <View className="absolute right-3">{DecorationIcon}</View>  
        </View>
    )
}