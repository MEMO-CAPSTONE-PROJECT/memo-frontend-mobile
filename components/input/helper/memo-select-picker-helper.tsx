import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoSelectPicker, { MemoSelectPickerProps } from "@/components/input/memo-select-picker";
import { Text, View } from "react-native";

interface MemoSelectPickerHelperProps extends MemoSelectPickerProps {
    label?: string
    error?: string
}

export default function MemoSelectPickerHelper({ label, error, ...props }: Readonly<MemoSelectPickerHelperProps>) {
    return (
        <View className="gap-y-md">
            {label && <Text className="font-kanit-bold text-body text-title-1 px-xsm">{label}</Text>}
            <MemoSelectPicker state={error ? "error" : "default"} {...props} />
            <MemoErrorMessage error={error}/>
        </View>
    )
}