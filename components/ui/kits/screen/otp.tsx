import BrandingBackground from "@/components/background/branding-background"
import MemoButton from "@/components/button/memo-button"
import MemoTextButton from "@/components/button/memo-text-button"
import MemoCard from "@/components/container/memo-card"
import MemoOtpTextInput from "@/components/input/memo-otp-text-input"
import KeyboardView from "@/components/scrollable/keyboard-view"
import { MemoTimer } from "@/components/timer/memo-timer"
import { getTimeMinuteSecond } from "@/shared/utils/date-util"
import { Href, Link } from "expo-router"
import { useMemo } from "react"
import { Text, View } from "react-native"

interface OTPUIKitProps {
    isLoading?: boolean
    email: string
    otp: OTPUIKitState
    resend: () => void
    verify: () => void
    previous: Href
}

interface OTPUIKitState {
    error?: string
    onChangeCode: (codes: string[]) => void
}

export default function OTPUIKit({ email, otp, resend, verify, previous, isLoading = false }: Readonly<OTPUIKitProps>) {
    const TIMER = 30   
    const emailFormatted = useMemo(() => email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1xxx@$2"), [email])
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
                        <MemoTimer initialTime={TIMER}>
                            {(time, reset) => (
                                <View className="flex-row justify-between">
                                    <Text className="text-body-2 font-kanit-regular text-caption-1">
                                        กดส่งรหัสได้อีกครั้งใน {getTimeMinuteSecond(time)} นาที
                                    </Text>
                                    <MemoTextButton 
                                        name="ส่งอีกครั้ง?" 
                                        onPress={() =>{
                                            reset()
                                            resend()
                                        }} 
                                        disabled={time > 0} 
                                    />
                                </View>
                            )}
                        </MemoTimer>
                        <MemoButton name="ยืนยัน" variant="primary" onPress={verify} isLoading={isLoading}/>
                        <Link href={previous} asChild>
                            <MemoButton name="ย้อนกลับ" variant="ghost" />
                        </Link>
                    </View>
                </MemoCard>
            </BrandingBackground>
        </KeyboardView>
    )
}