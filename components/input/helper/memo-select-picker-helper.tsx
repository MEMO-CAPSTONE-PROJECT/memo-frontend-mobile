import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoSelectPicker, { MemoSelectPickerProps } from "@/components/input/memo-select-picker";
import { Icon } from "phosphor-react-native";
import { Text, View } from "react-native";

interface MemoSelectPickerHelperProps extends MemoSelectPickerProps {
    label?: string
    error?: string
    rightIcon?: Icon
}

export default function MemoSelectPickerHelper({ label, error, rightIcon: RightIcon, ...props }: Readonly<MemoSelectPickerHelperProps>) {
    return (
        <View className="gap-y-sm">
            <View className="flex-row justify-between">
                {label && <Text className="font-kanit-medium text-body text-title-1 px-xsm">{label}</Text>}
                {RightIcon && <RightIcon/>}
            </View>
            <MemoSelectPicker state={error ? "error" : "default"} {...props} />
            <MemoErrorMessage error={error}/>
        </View>
    )
}