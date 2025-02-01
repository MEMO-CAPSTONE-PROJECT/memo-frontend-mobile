import StudentBoyQuestionSvg from "@/components/ui/icons/student/boy/question-svg";
import ForgotPasswordUIKit from "@/components/ui/kits/screen/forgot-password";

export default function ForgotPasswordScreen() {
    return (
        <ForgotPasswordUIKit
            icon={<StudentBoyQuestionSvg size={180} />} 
            steps={[
                "แอด LINE คุณครู @teacher-id",
                "แจ้งชื่อนักเรียนและเลขบัตรประชาชน",
                "รับรหัสนักเรียน และลองลงชื่อเข้าใช้ระบบใหม่อีกครั้ง"
            ]}
        />
    )
}