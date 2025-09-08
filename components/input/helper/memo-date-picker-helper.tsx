import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoDatePicker, { MemoDatePickerProps } from "@/components/input/memo-date-picker";
import { Text, View } from "react-native";

interface MemoDatePickerHelperProps extends MemoDatePickerProps {
    label?: string
    error?: string
}

export default function MemoDatePickerHelper({ label, error, ...props }: Readonly<MemoDatePickerHelperProps>) {
    return (
        <View className="flex-1 gap-y-sm">
            {label && <Text className="font-kanit-medium text-body text-title-1 px-xsm">{label}</Text>}
            <MemoDatePicker state={error ? "error" : "default"} {...props} />
            <MemoErrorMessage error={error}/>
        </View>
    )
}