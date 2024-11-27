import BrandingBackground from "@/components/background/branding-background"
import MemoButton from "@/components/button/memo-button"
import MemoTextButton from "@/components/button/memo-text-button"
import MemoCard from "@/components/container/memo-card"
import MemoOtpTextInput from "@/components/input/memo-otp-text-input"
import KeyboardView from "@/components/scrollable/keyboard-view"
import { Link } from "expo-router"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Text, View } from "react-native"

interface OtpUIKitsProps {
    email: string
    otp: OtpUIKitsState
    resend: () => void
    verify: () => void
}

interface OtpUIKitsState {
    error?: string
    onChangeCode: (codes: string[]) => void
}

export default function OtpUIKits({ email, otp, resend, verify }: Readonly<OtpUIKitsProps>) {
    const TIMER = 30
    const [timer, setTimer] = useState(TIMER)    
    const emailFormatted = useMemo(() => email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1xxx@$2"), [email])
    const timeoutCallback = useCallback(() => setTimer(current => current - 1), [])

    useEffect(() => { 
        if (timer > 0) {
            const timeout = setTimeout(timeoutCallback, 1000)
            return () => clearTimeout(timeout)
        }
    }, [timer, timeoutCallback])

    function getTime(time: number) {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    function reset() {
        setTimer(TIMER)
        resend()
    }

    const { error, onChangeCode } = otp
    return (
        <KeyboardView>
            <BrandingBackground variant="secondary" className="justify-end items-center">
                <MemoCard className="justify-between">
                    <View className="gap-y-3xl pt-5xl">
                        <View className="gap-y-lg items-center">
                            <Text className="text-body-1 font-kanit-bold text-title">
                                กรุณายืนยันตัวตนด้วยรหัส OTP
                            </Text>
                            <Text className="text-body-1 font-kanit-regular text-body text-center">
                                เราจะส่งรหัสให้คุณผ่านทางอีเมล{"\n"}{emailFormatted}
                            </Text>
                        </View>
                        <MemoOtpTextInput
                            length={5}
                            error={error}
                            onChangeCode={onChangeCode}
                        />
                    </View>
                    <View className="gap-y-lg">
                        <View className="flex-row justify-between">
                            <Text className="text-body-2 font-kanit-regular text-caption-1">
                                กดส่งรหัสได้อีกครั้งใน {getTime(timer)} นาที
                            </Text>
                            <MemoTextButton name="ส่งอีกครั้ง?" onPress={reset} disabled={timer > 0} />
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