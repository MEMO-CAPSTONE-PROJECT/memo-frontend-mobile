import OtpUIKits from "@/components/ui/kits/screen/otp";
import useAuth from "@/context/useAuth";
import { useStudentOTP } from "@/hooks/useOTP";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function StudentOtpScreen() {
    const [codes, setCodes] = useState<string[]>([])
    const [error, setError] = useState<string | undefined>(undefined)
    const auth = useAuth()
    const { studentId, studentEmail } = useLocalSearchParams()
    const { mutateAsync } = useStudentOTP()

    const handleChangeCode = (codes: string[]) => {
        //clear error
        setError(undefined)
        setCodes(codes)
    }
    
    async function login() {
        const otp = codes.join("")
        const result = await auth.login("VERIFY_LOGIN_STUDENT", { emailStudent: studentEmail, otp: otp })
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
        <OtpUIKits  
            email={studentEmail as string} 
            otp={{ error, onChangeCode: handleChangeCode }} 
            resend={resend}
            verify={login} 
        />
    )
}