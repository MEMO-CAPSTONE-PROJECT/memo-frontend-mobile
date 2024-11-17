import OtpUIKits from "@/components/ui/kits/screen/otp";
import { router } from "expo-router";
import { useState } from "react";

export default function ParentOtpScreen() {
    const [codes, setCodes] = useState<string[]>([])
    const [error, setError] = useState<string | undefined>(undefined)
    const email = "thannicha.xxxxx@gmail.com"

    const handleChangeCode = (codes: string[]) => {
        //clear error
        setError(undefined)
        setCodes(codes)
    }

    async function verify() {
        const otp = codes.join("")

        if (otp.match("11111")) {
            router.replace("/parent/login/students")
        } else {
            setError("รหัส OTP ไม่ถูกต้อง")
        }
    }
    function resend() {
        console.log("Resend otp")
        
    }

    return (
        <OtpUIKits  
            email={email} 
            otp={{ error, onChangeCode: handleChangeCode }} 
            resend={resend}
            verify={verify} 
        />
    )
}