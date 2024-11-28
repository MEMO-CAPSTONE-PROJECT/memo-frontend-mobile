
import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import MemoTextButton from '@/components/button/memo-text-button';
import MemoCard from '@/components/container/memo-card';
import MemoErrorMessage from '@/components/helper/memo-error-message';
import MemoTextInput from '@/components/input/memo-text-input';
import KeyboardView from '@/components/scrollable/keyboard-view';
import SurpriseStudentSvg from '@/components/ui/kits/surprise-student-svg';
import { useStudentOTP } from '@/hooks/useOTP';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

export default function StudentLoginScreen() {
    const [error, setError] = useState<string | undefined>(undefined)
    const [studentId, setStudentId] = useState("")
    const { mutateAsync, isPending } = useStudentOTP()

    async function handleSendOTP() {
        const result = await mutateAsync({ studentId: studentId }).catch(error => null)
        const email = result?.data?.emailStudent
        
        if (email) {
            router.replace({ pathname: "/student/login/otp", params: { studentId: studentId, studentEmail: email } })
        } else {
            setError("รหัสนักเรียนไม่ถูกต้อง")
        }
    }

    return (
        <KeyboardView>
            <BrandingBackground variant="secondary" className="justify-end items-center">
                <MemoCard className="justify-between">
                    <View className="flex gap-y-xl">
                        <SurpriseStudentSvg className="flex items-center" />
                        <View className="flex items-center gap-y-sm">
                            <Text className="font-kanit-bold text-title text-body-1">
                                ลงชื่อเข้าใช้ระบบ นักเรียน
                            </Text>
                            <Text className="font-kanit-regular text-body text-body-2">
                                กรุณาใส่รหัสนักเรียน
                            </Text>
                        </View>
                        <MemoTextInput state={error ? "error" : "default"} placeholder="รหัสนักเรียน" value={studentId} onChangeText={setStudentId} />
                    </View>
                    <View className="flex gap-y-lg">
                        <View className="flex-row justify-between">
                            <MemoErrorMessage error={error} />
                            <MemoTextButton name="ลืมรหัสนักเรียน?"/>
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

