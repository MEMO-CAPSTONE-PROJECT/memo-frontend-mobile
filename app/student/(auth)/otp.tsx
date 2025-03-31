import OTPUIKit from "@/components/ui/kits/screen/otp";
import { MemoApis } from "@/constants/apis";
import useAuth from "@/context/useAuth";
import { useStudentOTPMutation } from "@/hooks/mutation/useOTPMutation";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function StudentOtpScreen() {
    const [codes, setCodes] = useState<string[]>([])
    const [error, setError] = useState<string | undefined>(undefined)
    const auth = useAuth()
    const { studentId, studentEmail } = useLocalSearchParams()
    const { mutateAsync } = useStudentOTPMutation()

    const handleChangeCode = (codes: string[]) => {
        //clear error
        setError(undefined)
        setCodes(codes)
    }
    
    async function login() {
        const otp = codes.join("")
        const result = await auth.login(MemoApis.VERIFY_LOGIN_STUDENT, { emailStudent: studentEmail, otp: otp })
        if (result) {
            router.replace("/student/home")
        } else {
            setError("รหัส OTP ไม่ถูกต้อง")
        }
    }
    function resend() {
        if (!studentId) return
        mutateAsync({ studentId: studentId as string }).catch(error => null)
    }

    return (
        <OTPUIKit  
            email={studentEmail as string} 
            otp={{ error, onChangeCode: handleChangeCode }} 
            resend={resend}
            verify={login} 
            previous="/student/(auth)/login"     
        />
    )
}