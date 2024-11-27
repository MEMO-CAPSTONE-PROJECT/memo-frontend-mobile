import { getMemoBorderWidth } from "@/constants/theme/border-width";
import { FontFamily } from "@/constants/theme/font";
import { getMemoLayoutSize } from "@/constants/theme/layout-size";
import { InputStateColors } from "@/shared/themes/input-variants";
import { MemoInputStates } from "@/shared/types/input-state-type";
import { useState } from "react";
import { TextArea, TextAreaProps } from "tamagui";

export interface MemoTextAreaInputProps extends TextAreaProps {
    state?: keyof MemoInputStates
}

export default function MemoTextAreaInput({ state = "default", ...props }: Readonly<MemoTextAreaInputProps>) {
    const [focus, setFocus] = useState(false)
    const { bgColor, placeholderColor, borderColor, textColor } = focus ? InputStateColors.focus : InputStateColors[state]
    return (
        <TextArea
            height={100}
            fontFamily={FontFamily["kanit-medium"]}
            paddingVertical={getMemoLayoutSize("md")}
            placeholderTextColor={placeholderColor}
            borderWidth={getMemoBorderWidth("xsm")}
            borderColor={borderColor}
            backgroundColor={bgColor}
            color={textColor}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            focusStyle={{
                borderWidth: getMemoBorderWidth("xsm"),
                borderColor: InputStateColors.focus.borderColor,
                backgroundColor: InputStateColors.focus.bgColor,
                color: InputStateColors.focus.textColor
            }}
            {...props}
        />
    )
}