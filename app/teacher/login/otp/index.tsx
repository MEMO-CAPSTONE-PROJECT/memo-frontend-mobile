import OtpUIKits from "@/components/ui/kits/screen/otp";
import { MEMO_APIS } from "@/constants/apis";
import { useAuth } from "@/context/useAuth";
import { sendTeacherOTP } from "@/shared/services/otp-service";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function TeacherOtpScreen() {
    const [codes, setCodes] = useState<string[]>([])
    const [error, setError] = useState<string | undefined>(undefined)
    const auth = useAuth()
    const { teacherId, teacherEmail } = useLocalSearchParams()

    const handleChangeCode = (codes: string[]) => {
        //clear error
        setError(undefined)
        setCodes(codes)
    }

    async function handleLogin() {
        const otp = codes.join("")
        const result = await auth.login(MEMO_APIS.verify.teacher, { emailTeacher: teacherEmail, otp: otp })
        if (result) {
            router.push("/teacher/home")
        } else {
            setError("รหัส OTP ไม่ถูกต้อง")
        }
    }
    function resend() {
        if (!teacherId) return
        sendTeacherOTP((teacherId as string))
    }

    return (
        <OtpUIKits  
            email={teacherEmail as string} 
            otp={{ error, onChangeCode: handleChangeCode }} 
            resend={resend}
            verify={handleLogin} 
        />
    )
}