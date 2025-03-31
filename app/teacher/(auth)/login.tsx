import BrandingBackground from "@/components/background/branding-background"
import MemoButton from "@/components/button/memo-button"
import MemoTextButton from "@/components/button/memo-text-button"
import MemoCard from "@/components/container/memo-card"
import MemoErrorMessage from "@/components/helper/memo-error-message"
import MemoTextInput from "@/components/input/memo-text-input"
import KeyboardView from "@/components/scrollable/keyboard-view"
import TeacherBlackboardSvg from "@/components/ui/kits/teacher-blackboard-svg"
import { useTeacherOTPMutation } from "@/hooks/mutation/useOTPMutation"
import { Link, router } from "expo-router"
import { useState } from "react"
import { Text, View } from "react-native"

export default function TeacherLoginScreen() {
    const [error, setError] = useState<string | undefined>(undefined)
    const [teacherId, setTeacherId] = useState("")
    const { mutateAsync, isPending } = useTeacherOTPMutation()

    async function handleSendOTP() {
        const result = await mutateAsync({ teacherId: teacherId }).catch(error => null)
        const email = result?.data?.emailTeacher
        
        if (email) {
            router.replace({ pathname: "/teacher/(auth)/otp", params: { teacherId: teacherId, teacherEmail: email } })
        } else {
            setError("รหัสคุณครูไม่ถูกต้อง")
        }
    }

    return (
        <KeyboardView>
            <BrandingBackground variant="secondary" className="justify-end items-center">
                <MemoCard className="justify-between">
                    <View className="flex gap-y-xl">
                        <TeacherBlackboardSvg className="flex items-center" />
                        <View className="flex items-center gap-y-sm">
                            <Text className="font-kanit-bold text-title text-body-1">
                                ลงชื่อเข้าใช้ระบบ คุณครู
                            </Text>
                            <Text className="font-kanit-regular text-body text-body-2">
                                กรุณาใส่รหัสคุณครู
                            </Text>
                        </View>
                        <MemoTextInput state={error ? "error" : "default"} placeholder="รหัสคุณครู" value={teacherId} onChangeText={setTeacherId} />
                    </View>
                    <View className="flex gap-y-lg">
                        <View className="flex-row justify-between">
                            <MemoErrorMessage error={error} />
                            <Link href="/teacher/(auth)/forgot" asChild>
                                <MemoTextButton name="ลืมรหัสคุณครู?" />
                            </Link>
                        </View>
                        <MemoButton 
                            isLoading={isPending}
                            name="เข้าสู่ระบบ" 
                            variant="primary" 
                            onPress={handleSendOTP}
                        />
                        <Link href="/" asChild>
                            <MemoButton name="กลับสู่หน้าเริ่มต้น" variant="ghost" />
                        </Link>
                    </View>
                </MemoCard>
            </BrandingBackground>
        </KeyboardView>
    )
}