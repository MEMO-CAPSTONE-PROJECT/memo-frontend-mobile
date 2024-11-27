import { MEMO_APIS } from "@/constants/apis"
import api from "@/shared/api-handler"

export async function sendTeacherOTP(teacherId: string): Promise<string | null> {
    try {
        const result = await api.post(MEMO_APIS.login.teacher, { teacherId: teacherId })
        const email = result.data?.data?.emailTeacher
        if (!email) throw new Error("รหัสคุณครูไม่ถูกต้อง")
        return email
    } catch (error) {
        return null
    }
}