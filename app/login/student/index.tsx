import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import MemoTextButton from '@/components/button/memo-text-button';
import MemoCard from '@/components/container/memo-card';
import MemoErrorMessage from '@/components/helper/memo-error-message';
import MemoTextInput from '@/components/input/memo-text-input';
import SurpriseStudentSvg from '@/components/ui/kits/surprise-student-svg';
import { Link } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

export default function StudentLoginScreen() {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView
                keyboardShouldPersistTaps="never"
                keyboardDismissMode="interactive"
                scrollEnabled={false}
                contentContainerClassName="h-full w-screen"
            >
                <BrandingBackground variant="secondary" className="justify-end items-center">
                    <MemoCard className="z-20 justify-between">
                        <View className="flex gap-y-xl">
                            <SurpriseStudentSvg className="flex items-center" />
                            <View className="flex items-center gap-y-sm">
                                <Text className="font-kanit-bold space text-title text-body-1">ลงชื่อเข้าใช้ระบบ นักเรียน</Text>
                                <Text className="font-kanit-regular text-body text-body-2">กรุณาใส่รหัสนักเรียน</Text>
                            </View>
                            <MemoTextInput state="default" placeholder="รหัสนักเรียน" />
                        </View>
                        <View className="flex gap-y-md">
                            <View className="flex-row justify-between">
                                <MemoErrorMessage error="รหัสนักเรียนไม่ถูกต้อง" />
                                <MemoTextButton name="ลืมรหัสนักเรียน?" />
                            </View>
                            <MemoButton name="เข้าสู่ระบบ" variant="primary" />
                            <Link href="/" asChild>
                                <MemoButton name="กลับสู่หน้าเริ่มต้น" variant="ghost" />
                            </Link>
                        </View>
                    </MemoCard>
                </BrandingBackground>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

