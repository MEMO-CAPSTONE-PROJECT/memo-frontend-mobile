import SafeAreaAvoidingView from "@/components/background/safe-area-avoiding-view";
import MemoButton from "@/components/button/memo-button";
import MemoTextInput from "@/components/input/memo-text-input";
import { useModal } from "@/context/useModal";
import { X } from "phosphor-react-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";

interface MemoCouponModalProps {
    onSubmit?: (code: string) => void
    children?: (setVisible: (visible: boolean) => void) => React.ReactNode
}

export default function MemoCouponModal({ onSubmit }: Readonly<MemoCouponModalProps>) {
    const { hideModal } = useModal()
    const [value, setValue] = useState<string>("")

    const handleSubmit = () => {
        onSubmit?.(value)
        hideModal()
    }

    return (
        <SafeAreaAvoidingView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="flex-1 justify-center px-3xl">
                    <TouchableOpacity className="absolute top-2 left-8" onPress={hideModal}>
                        <X size={24} />
                    </TouchableOpacity>
                    <View className="flex-col gap-lg">
                        <Text className="font-kanit-bold text-title text-title-1">กรอกชุดรหัสเพื่อรับคะแนน</Text>
                        <MemoTextInput placeholder="s12f0d" autoFocus={true} value={value} onChangeText={setValue} />
                        <MemoButton name="ยืนยัน" variant="primary" onPress={handleSubmit} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaAvoidingView>
    )
}