import { getMemoBorderWidth } from "@/constants/theme/border-width";
import { Color } from "@/constants/theme/color";
import { InputStateColors } from "@/shared/themes/input-variants";
import { MemoInputStates } from "@/shared/types/input-state-type";
import { CheckCircle, PencilSimpleSlash, XCircle } from "phosphor-react-native";
import { useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";

export interface MemoTextInputProps extends TextInputProps {
    state?: keyof MemoInputStates
    placeholder?: string
    className?: string
}

export default function MemoTextInput({ placeholder, state = "default", className, ...textInputProps }: Readonly<MemoTextInputProps>) {
    const [focus, setFocus] = useState(false)
    const icons = {
        default: <></>,
        focus: <></>,
        error: <XCircle size={24} weight="bold" color={Color["system-error"]}/>,
        success: <CheckCircle size={24} weight="bold" color={Color["system-success"]}/>,
        disabled: <PencilSimpleSlash size={24} weight="bold" color={Color["body-2"]}/>,
    }
    const { bgColor, placeholderColor, borderColor, textColor } = focus ? InputStateColors.focus : InputStateColors[state]
    const DecorationIcon = focus ? icons.focus : icons[state]
    return (
        <View 
            className={`flex-row justify-between items-center h-5xl rounded-sm ${className}`}
            style={{
                backgroundColor: bgColor,
                borderWidth: getMemoBorderWidth("xsm"),
                borderColor: borderColor
            }}
        >
            <TextInput 
                placeholder={placeholder}
                placeholderTextColor={placeholderColor}
                className={`font-kanit-medium pl-lg flex-1 ease-in-out transition `}
                style={{
                    color: textColor
                }}
                editable={state !== "disabled"}
                selectTextOnFocus={state !== "disabled"}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                {...textInputProps}
            />  
           <View className="p-lg pl-1">{DecorationIcon}</View>  
        </View>
    )
}