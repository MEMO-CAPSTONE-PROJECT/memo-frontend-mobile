import TeacherManQuestionSvg from "@/components/ui/icons/teacher/man/question-svg";
import ForgotPasswordUIKit from "@/components/ui/kits/screen/forgot-password";

export default function ForgotPasswordScreen() {
    return (
        <ForgotPasswordUIKit 
            icon={<TeacherManQuestionSvg size={180} />}
            steps={[
                "แอด LINE คุณครูธุรการ @teacher-id",
                "แจ้งชื่อคุณครูและเลขบัตรประชาชน",
                "รับรหัสคุณครู และลองลงชื่อเข้าใช้ระบบใหม่อีกครั้ง"
            ]}
        />
    )
}