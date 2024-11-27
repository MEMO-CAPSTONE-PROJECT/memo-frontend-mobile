import MemoErrorMessage from "@/components/helper/memo-error-message"
import { getMemoBorderWidth } from "@/constants/theme/border-width"
import { InputStateColors } from "@/shared/themes/input-variants"
import { createRef, RefObject, useState } from "react"
import { TextInput, View } from "react-native"

interface MemoOtpTextInputProps {
    length: number
    onChangeCode: (codes: string[]) => void
    error?: string
}

export default function MemoOtpTextInput({
    length,
    error,
    onChangeCode,
}: Readonly<MemoOtpTextInputProps>) {
    const [codes, setCodes] = useState<string[]>(Array(length).fill(""))
    const refs: RefObject<TextInput>[] = Array(length).fill(null).map(() => createRef<TextInput>())

    const { bgColor, borderColor, textColor } = error ? InputStateColors.error : InputStateColors.default

    const handleCodeChange = (text: string, index: number) => {
        if (text.length > 1) {
            const newCodes = text.split("")
            setCodes(newCodes)
            onChangeCode(newCodes)
            refs[length - 1]?.current?.focus()
            return
        }

        const newCodes = [...codes]
        newCodes[index] = text
        setCodes(newCodes)
        onChangeCode(newCodes)

        if (text !== "" && index < length - 1) {
            refs[index + 1]?.current?.focus()
        }
    }

    const handleKeyPress = (key: string, index: number) => {
        if (key === "Backspace" && index > 0) {
            handleCodeChange("", index - 1)
            refs[index - 1]?.current?.focus()
        }
    }
    return (
        <View className="gap-y-lg">
            <View className="flex w-full flex-row justify-between">
                {codes.map((code, index) => (
                    <TextInput
                        key={index + code}
                        autoComplete="one-time-code"
                        enterKeyHint="next"
                        className={`
                            font-kanit-bold text-header text-body-1 h-[65px] w-[65px] rounded-sm text-center 
                        `}
                        style={{
                            borderWidth: getMemoBorderWidth("xsm"),
                            borderColor: borderColor,
                            backgroundColor: bgColor,
                            color: textColor
                        }}
                        inputMode="numeric"
                        onChangeText={(text: string) => handleCodeChange(text, index)}
                        value={code}
                        maxLength={1}
                        ref={refs[index]}
                        onKeyPress={(event) => handleKeyPress(event.nativeEvent.key, index)}
                    />
                ))}
            </View>
            <MemoErrorMessage error={error} className="justify-center" />
        </View>
    )
}