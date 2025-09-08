import { useFormContext } from "@/context/useForm"
import { BaseAchievementBody, BaseAchievementRequest, BaseImageRequestBody } from "@/hooks/achievement/useAchievementMutation"
import { useTeacherAchievementsQuery } from "@/hooks/achievement/useAchievementQuery"
import { useTeacherToken } from "@/hooks/useUserToken"
import { getDateISOString, removeHours } from "@/shared/utils/date-util"
import { UseMutationResult } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Dispatch, SetStateAction } from "react"
import { z } from "zod"

export const MAX_ACHIEVEMENT_TYPE = 2

export const UpsertAchievementSchema = z.object({
    name: z.string().min(1, "กรุณาใส่ชื่อเป้าหมาย").max(50, "ไม่สามารถเกิน 50 ได้"),
    amount: z.string().min(1, "กรุณาใส่จำนวนที่เข้าร่วม").max(3, "ไม่สามารถเกิน 999 ได้"),
    startDate: z.coerce.date({ 
        errorMap: ({ code }) => {
            if (code === "invalid_date") return { message: "กรุณาใส่เวลาให้ถูกต้อง" }
            return { message: "กรุณาใส่เวลาเปิด" }
        }
    }).refine((date) => removeHours(date) >= removeHours(new Date()), {
        message: "ไม่สามารถเป็นเวลาในอดีตได้"
    }),
    endDate: z.coerce.date({ 
        errorMap: ({ code }) => {
            if (code === "invalid_date") return { message: "กรุณาใส่เวลาให้ถูกต้อง" }
            return { message: "กรุณาใส่เวลาปิด" }
        }
    }),
    points: z.array(
        z.object({
            id: z.string().min(1, "กรุณาใส่กลุ่มความถนัด"),
            normal: z.string().min(1, "กรุณาใส่คะแนนคนที่ผ่าน").max(3, "ไม่สามารถเกิน 999 ได้"),
            excellent: z.string().min(1, "กรุณาใส่คะแนนคนเก่ง").max(3, "ไม่สามารถเกิน 999 ได้")
        }
        )),
    description: z
        .string()
        .min(1, "กรุณาใส่รายละเอียด")
        .max(500, "ไม่สามารถเขียนเกิน 500 ได้")
}).refine((data) => data.endDate > data.startDate, {
    message: "วันที่ปิดควรมากกว่าวันที่เปิด",
    path: ["endDate"],
})
export type UpsertAchievementForm = z.infer<typeof UpsertAchievementSchema>

export function useUpsertAchievement<T extends BaseAchievementBody>(
    mutation: UseMutationResult<null, AxiosError, BaseAchievementRequest<T>>,
    setError: Dispatch<SetStateAction<string | undefined>>
) {
    const { mutateAsync: upsertAchievement } = mutation
    const { data: teacher } = useTeacherToken()
    const { data: rawTeacherAchievements, refetch: refetchAchievements } = useTeacherAchievementsQuery()
    const teacherAchievements = rawTeacherAchievements?.data?.achievementTeacher

    // const [errors, setErrors] = useState<ZodFormattedError<UpsertAchievementForm, string>>()
    const { form, update, setErrors, } = useFormContext<UpsertAchievementForm>()

    const handleAddType = () => {
        if (form.points.length >= MAX_ACHIEVEMENT_TYPE) return
        update("points", [...form.points, { id: "", normal: "", excellent: "" }])
    }

    const handleRemoveType = (index: number) => {
        const updatedPoints = form.points.filter((_, i) => i !== index)
        update("points", updatedPoints)
    }

    const handleSubmit = async (
        errorMessage: string,
        images: BaseImageRequestBody[],
        onSuccess?: () => void,
    ) => {
        try {
            const result = UpsertAchievementSchema.safeParse(form)

            if (!result.success) {
                setErrors(result.error.format())
                setError("กรุณากรอกข้อมูลทั้งหมดให้ถูกต้อง")
                return
            }

            setErrors(undefined)
            setError(undefined)

            const formattedForm = {
                ...form,
                startDate: getDateISOString(form.startDate),
                endDate: getDateISOString(form.endDate),
                teacherId: String(teacher?.sub ?? ""),
            } as T

            const response = await upsertAchievement({
                json: formattedForm,
                images: images
            })
            if (response) {
                onSuccess?.()
                refetchAchievements()
            } else {
                setError("เกิดข้อผิดพลาดในการสร้างเป้าหมาย")
            }
        } catch (error) {
            console.error('Upsert achievement error:', error)
            setError(errorMessage)
        }
    }

    return {
        teacherAchievements,
        handleAddType,
        handleRemoveType,
        handleSubmit,
    }

}