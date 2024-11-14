import { Color } from "@/constants/theme/color";
import { CheckCircle, PencilSimpleSlash, XCircle } from "phosphor-react-native";
import { TextInput, View } from "react-native";

interface MemoTextInputProps {
    state?: keyof MemoTextInputState
    placeholder?: string
    className?: string
}

interface MemoTextInputState {
    default: string
    error: string
    success: string
    disabled: string
}

export default function MemoTextInput({ placeholder, state = "default", className }: Readonly<MemoTextInputProps>) {
    const states = {
        default: { borderColor: undefined, bgColor: "bg-system-light-gray", placeholderColor: Color["body-2"], textColor: "text-title-1" },
        error: { borderColor: "border-system-error", bgColor: "bg-system-error-light", placeholderColor: Color["system-error"], textColor: "text-system-error" },
        success: { borderColor: "border-system-success", bgColor: "bg-system-success-light", placeholderColor: Color["system-success"], textColor: "text-system-success" },
        disabled: { borderColor: "border-body-2", bgColor: "bg-system-gray", placeholderColor: Color["body-2"], textColor: "text-body-2" },
    }
    const icons = {
        default: <></>,
        error: <XCircle size={24} weight="bold" color={Color["system-error"]}/>,
        success: <CheckCircle size={24} weight="bold" color={Color["system-success"]}/>,
        disabled: <PencilSimpleSlash size={24} weight="bold" color={Color["body-2"]}/>,
    }
    const { bgColor, placeholderColor, borderColor, textColor } = states[state]
    const DecorationIcon = icons[state]
    const borderClasses = borderColor ? `border-xsm ${borderColor}` : ""
    return (
        <View className={`flex-row justify-between items-center h-5xl rounded-sm ${borderClasses} ${bgColor} ${placeholderColor} ${className}`}>
            <TextInput 
                placeholder={placeholder}
                placeholderTextColor={placeholderColor}
                className={`font-kanit-medium ${textColor} pl-3 flex-1 ease-in-out transition`}
                editable={state !== "disabled"}
                selectTextOnFocus={state !== "disabled"}
            />  
           <View className="p-3 pl-1">{DecorationIcon}</View>  
        </View>
    )
}