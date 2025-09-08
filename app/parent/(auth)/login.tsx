import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoCard from "@/components/container/memo-card";
import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoTextInput from "@/components/input/memo-text-input";
import KeyboardView from "@/components/scrollable/keyboard-view";
import SurpriseParentSvg from "@/components/ui/kits/surprise-parent-svg";
import { useParentOTPMutation } from "@/hooks/mutation/useOTPMutation";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function ParentLoginScreen() {
    const [error, setError] = useState<string | undefined>(undefined)
    const [parentPhoneNumber, setParentPhoneNumber] = useState("")
    const { mutateAsync, isPending } = useParentOTPMutation()

    async function handleSendOTP() {
        const result = await mutateAsync({ phoneNumber: parentPhoneNumber }).catch(error => null)
        const email = result?.data?.emailParent
        
        if (email) {
            router.replace({ pathname: "/parent/(auth)/otp", params: { parentPhoneNumber: parentPhoneNumber, parentEmail: email } })
        } else {
            setError("เบอร์ผู้ปกครองไม่ถูกต้อง")
        }
    }

    return (
        <KeyboardView>
            <BrandingBackground variant="secondary" className="justify-end items-center">
                <MemoCard className="justify-between">
                    <View className="flex gap-y-xl">
                        <SurpriseParentSvg className="flex items-center" />
                        <View className="flex items-center gap-y-sm">
                            <Text className="font-kanit-bold text-title text-body-1">
                                ลงชื่อเข้าใช้ระบบ ผู้ปกครอง
                            </Text>
                            <Text className="font-kanit-regular text-body text-body-2">
                                กรุณาใส่เบอร์โทรศัพท์
                            </Text>
                        </View>
                        <MemoTextInput state={error ? "error" : "default"} placeholder="เบอร์ผู้ปกครอง" value={parentPhoneNumber} onChangeText={setParentPhoneNumber} />
                    </View>
                    <View className="flex gap-y-lg">
                        <View className="flex-row justify-between">
                            <MemoErrorMessage error={error} />
                        </View>
                        <MemoButton isLoading={isPending} name="เข้าสู่ระบบ" variant="primary" onPress={handleSendOTP} />
                        <Link href="/" asChild>
                            <MemoButton name="กลับสู่หน้าเริ่มต้น" variant="ghost" />
                        </Link>
                    </View>
                </MemoCard>
            </BrandingBackground>
        </KeyboardView>
    )
}