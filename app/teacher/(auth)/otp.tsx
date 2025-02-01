import OTPUIKit from "@/components/ui/kits/screen/otp";
import { MemoApis } from "@/constants/apis";
import useAuth from "@/context/useAuth";
import { useTeacherOTPMutation } from "@/hooks/query/useOTPMutation";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function TeacherOtpScreen() {
    const [codes, setCodes] = useState<string[]>([])
    const [error, setError] = useState<string | undefined>(undefined)
    const auth = useAuth()
    const { teacherId, teacherEmail } = useLocalSearchParams()
    const { mutateAsync } = useTeacherOTPMutation()

    const handleChangeCode = (codes: string[]) => {
        //clear error
        setError(undefined)
        setCodes(codes)
    }

    async function login() {
        const otp = codes.join("")
        const result = await auth.login(MemoApis.VERIFY_LOGIN_TEACHER, { emailTeacher: teacherEmail, otp: otp })
        if (result) {
            router.replace("/teacher/home")
        } else {
            setError("รหัส OTP ไม่ถูกต้อง")
        }
    }
    function resend() {
        if (!teacherId) return
        mutateAsync({ teacherId: teacherId as string }).catch(error => null)
    }

    return (
        <OTPUIKit  
            email={teacherEmail as string} 
            otp={{ error, onChangeCode: handleChangeCode }} 
            resend={resend}
            verify={login} 
        />
    )
}