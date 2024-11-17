import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoTextButton from "@/components/button/memo-text-button";
import MemoCard from "@/components/container/memo-card";
import MemoErrorMessage from "@/components/helper/memo-error-message";
import MemoTextInput from "@/components/input/memo-text-input";
import KeyboardView from "@/components/scrollable/keyboard-view";
import TeacherBlackboardSvg from "@/components/ui/kits/teacher-blackboard-svg";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function TeacherLoginScreen() {
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
                        <MemoTextInput state="default" placeholder="รหัสคุณครู" />
                    </View>
                    <View className="flex gap-y-lg">
                        <View className="flex-row justify-between">
                            <MemoErrorMessage error="รหัสคุณครูไม่ถูกต้อง" />
                            <MemoTextButton name="ลืมรหัสคุณครู?" />
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