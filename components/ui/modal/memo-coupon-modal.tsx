import SafeAreaAvoidingView from "@/components/background/safe-area-avoiding-view";
import MemoButton from "@/components/button/memo-button";
import MemoTextInput from "@/components/input/memo-text-input";
import { X } from "phosphor-react-native";
import { Fragment, useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, View } from "react-native";

interface MemoCouponModalProps {
    children: (setVisible: (visible: boolean) => void) => React.ReactNode
}

export default function MemoCouponModal({ children }: Readonly<MemoCouponModalProps>) {
    const [visible, setVisible] = useState(false)

    return (
        <Fragment>
            {children(setVisible)}
            <Modal
                animationType="fade"
                visible={visible}
            >
                <SafeAreaAvoidingView>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        className="flex-1"
                    >
                        <View className="flex-1 justify-center px-3xl">
                            <TouchableOpacity className="absolute top-2 left-8" onPress={() => setVisible(false)}>
                                <X size={24} />
                            </TouchableOpacity>
                            <View className="flex-col gap-lg">
                                <Text className="font-kanit-bold text-title text-title-1">กรอกชุดรหัสเพื่อรับคะแนน</Text>
                                <MemoTextInput placeholder="s12f0d" autoFocus={true} />
                                <MemoButton name="ยืนยัน" variant="primary" onPress={() => setVisible(false)} />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaAvoidingView>
            </Modal>
        </Fragment>
    )
}