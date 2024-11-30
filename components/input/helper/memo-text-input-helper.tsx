import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoTextInput, { MemoTextInputProps } from "@/components/input/memo-text-input";
import { Text, View } from "react-native";

interface MemoTextInputHelperProps extends MemoTextInputProps {
    label?: string
    error?: string
}

export default function MemoTextInputHelper({ label, error, ...props }: Readonly<MemoTextInputHelperProps>) {
    return (
        <View className="flex-1 gap-y-sm">
            {label && <Text className="font-kanit-medium text-body text-title-1 px-xsm">{label}</Text>}
            <MemoTextInput state={error ? "error" : "default"} {...props} />
            <MemoErrorMessage error={error}/>
        </View>
    )
}