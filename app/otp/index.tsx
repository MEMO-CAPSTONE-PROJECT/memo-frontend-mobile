import BrandingBackground from "@/components/background/branding-background"
import MemoButton from "@/components/button/memo-button"
import MemoTextButton from "@/components/button/memo-text-button"
import MemoCard from "@/components/container/memo-card"
import MemoOtpTextInput from "@/components/input/memo-otp-text-input"
import KeyboardView from "@/components/scrollable/keyboard-view"
import { Link, router } from "expo-router"
import { useState } from "react"
import { Text, View } from "react-native"

export default function OtpScreen() {
    const [codes, setCodes] = useState<string[]>([])
    const [error, setError] = useState<string | undefined>(undefined)
    const email = "thannicha.xxxxx@gmail.com"
    const timeout = "02:30"

    const handleChangeCode = (codes: string[]) => {
        //clear error
        setError(undefined)
        setCodes(codes)
    }

    async function verify() {
        const otp = codes.join("")

        if (otp.match("11111")) {
            router.replace("/student/home")
        } else {
            setError("รหัส OTP ไม่ถูกต้อง")
        }
    }

    return (
        <KeyboardView>
            <BrandingBackground variant="secondary" className="justify-end items-center">
                <MemoCard className="z-20 justify-between">
                    <View className="gap-y-3xl py-5xl">
                        <View className="gap-y-lg items-center">
                            <Text className="text-body-1 font-kanit-bold text-title">
                                กรุณายืนยันตัวตนด้วยรหัส OTP
                            </Text>
                            <Text className="text-body-1 font-kanit-regular text-body text-center">
                                เราจะส่งรหัสให้คุณผ่านทางอีเมล{"\n"}{email}
                            </Text>
                        </View>
                        <MemoOtpTextInput 
                            length={5}
                            error={error}
                            onChangeCode={handleChangeCode}
                        />
                    </View>
                    <View className="gap-y-lg">
                        <View className="flex-row justify-between">
                            <Text className="text-body-2 font-kanit-regular text-caption-1">
                                รหัสหมดอายุใน {timeout} นาที
                            </Text>
                            <MemoTextButton name="ส่งอีกครั้ง?"/>
                        </View>
                        <MemoButton name="ยืนยัน" variant="primary" onPress={verify} />
                        <Link href=".." asChild>
                            <MemoButton name="ย้อนกลับ" variant="ghost" />
                        </Link>
                    </View>
                </MemoCard>
            </BrandingBackground>
        </KeyboardView>
    )
}

