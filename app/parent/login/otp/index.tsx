import OtpUIKits from "@/components/ui/kits/screen/otp";
import useAuth from "@/context/useAuth";
import { useParentOTP } from "@/hooks/useOTP";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function ParentOtpScreen() {
    const [codes, setCodes] = useState<string[]>([])
    const [error, setError] = useState<string | undefined>(undefined)
    const auth = useAuth()
    const { parentPhoneNumber, parentEmail } = useLocalSearchParams()
    const { mutateAsync } = useParentOTP()

    const handleChangeCode = (codes: string[]) => {
        //clear error
        setError(undefined)
        setCodes(codes)
    }

    async function login() {
        const otp = codes.join("")
        const result = await auth.login("VERIFY_LOGIN_PARENT", { emailParent: parentEmail, otp: otp })
        if (result) {
            router.replace("/parent/login/students")
        } else {
            setError("รหัส OTP ไม่ถูกต้อง")
        }
    }
    function resend() {
        if (!parentPhoneNumber) return
        mutateAsync({ phoneNumber: parentPhoneNumber as string }).catch(error => null)
    }

    return (
        <OtpUIKits  
            email={parentEmail as string} 
            otp={{ error, onChangeCode: handleChangeCode }} 
            resend={resend}
            verify={login} 
        />
    )
}