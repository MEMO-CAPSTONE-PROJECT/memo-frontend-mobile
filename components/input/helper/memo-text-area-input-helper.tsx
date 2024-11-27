import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoTextAreaInput, { MemoTextAreaInputProps } from "@/components/input/memo-text-area-input";
import { Text, View } from "react-native";

interface MemoTextAreaInputHelperProps extends MemoTextAreaInputProps {
    label?: string
    error?: string
}

export default function MemoTextAreaInputHelper({ label, error, ...props }: Readonly<MemoTextAreaInputHelperProps>) {
    return (
        <View className="gap-y-sm">
            {label && <Text className="font-kanit-medium text-body text-title-1 px-xsm">{label}</Text>}
            <MemoTextAreaInput state={error ? "error" : "default"} {...props} />
            <MemoErrorMessage error={error}/>
        </View>
    )
}