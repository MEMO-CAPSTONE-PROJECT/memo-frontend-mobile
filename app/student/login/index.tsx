
import BrandingBackground from '@/components/background/branding-background';
import MemoButton from '@/components/button/memo-button';
import MemoTextButton from '@/components/button/memo-text-button';
import MemoCard from '@/components/container/memo-card';
import MemoErrorMessage from '@/components/helper/memo-error-message';
import MemoTextInput from '@/components/input/memo-text-input';
import KeyboardView from '@/components/scrollable/keyboard-view';
import MemoText from '@/components/text/memo-text';
import SurpriseStudentSvg from '@/components/ui/kits/surprise-student-svg';
import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function StudentLoginScreen() {
    return (
        <KeyboardView>
            <BrandingBackground variant="secondary" className="justify-end items-center">
                <MemoCard className="z-20 justify-between">
                    <View className="flex gap-y-xl">
                        <SurpriseStudentSvg className="flex items-center" />
                        <View className="flex items-center gap-y-sm">
                            <MemoText weight="bold" size="title">ลงชื่อเข้าใช้ระบบ นักเรียน</MemoText>
                            <MemoText color="body-2" size="body">กรุณาใส่รหัสนักเรียน</MemoText>
                        </View>
                        <MemoTextInput state="default" placeholder="รหัสนักเรียน" />
                    </View>
                    <View className="flex gap-y-lg">
                        <View className="flex-row justify-between">
                            <MemoErrorMessage error="รหัสนักเรียนไม่ถูกต้อง" />
                            <MemoTextButton name="ลืมรหัสนักเรียน?" />
                        </View>
                        <Link href="/otp" asChild>
                            <MemoButton name="เข้าสู่ระบบ" variant="primary" />
                        </Link>
                        <Link href="/" asChild>
                            <MemoButton name="กลับสู่หน้าเริ่มต้น" variant="ghost" />
                        </Link>
                    </View>
                </MemoCard>
            </BrandingBackground>
        </KeyboardView>
    )
}

