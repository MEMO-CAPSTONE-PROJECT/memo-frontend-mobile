import { CreateAchievementRequest } from "@/hooks/achievement/useAchievementMutation"
import { useTeacherAchievementsQuery } from "@/hooks/achievement/useAchievementQuery"
import useForm from "@/hooks/useForm"
import { useTeacherToken } from "@/hooks/useUserToken"
import { getDateISOString, removeHours } from "@/shared/utils/date-util"
import { UseMutationResult } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { Dispatch, SetStateAction, useState } from "react"
import { z, ZodFormattedError } from "zod"

export const MAX_ACHIEVEMENT_TYPE = 2

const UpsertAchievementSchema = z.object({
    name: z.string().min(1, "กรุณาใส่ชื่อเป้าหมาย").max(50, "ไม่สามารถเกิน 50 ได้"),
    amount: z.string().min(1, "กรุณาใส่จำนวนที่เข้าร่วม").max(3, "ไม่สามารถเกิน 999 ได้"),
    startDate: z.coerce.date({ message: "กรุณาใส่เวลาเปิด" }).refine((date) => removeHours(date) >= removeHours(new Date()), {
        message: "ไม่สามารถเป็นเวลาในอดีตได้"
    }),
    endDate: z.coerce.date({ message: "กรุณาใส่เวลาปิด" }),
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

export function useUpsertAchievement(
    achievementId: string | undefined, 
    mutation: UseMutationResult<null, AxiosError, CreateAchievementRequest>,
    setError: Dispatch<SetStateAction<string | undefined>>
) {
    const { mutateAsync: upsertAchievement } = mutation
    const { data: teacher } = useTeacherToken()
    const { data: rawTeacherAchievements, refetch: refetchAchievements } = useTeacherAchievementsQuery()
    const teacherAchievements = rawTeacherAchievements?.data?.achievementTeacher

    const [errors, setErrors] = useState<ZodFormattedError<UpsertAchievementForm, string>>()

    const { form, update, reset } = useForm<UpsertAchievementForm>({
        name: "",
        amount: "",
        startDate: new Date(),
        endDate: new Date(),
        points: [],
        description: ""
    })

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
            }

            const response = await upsertAchievement(formattedForm)
            if (response) {
                onSuccess?.()
                refetchAchievements()
            }
        } catch (error) {
            console.error('Upsert achievement error:', error)
            setError(errorMessage)
        }
    }

    return {
        teacherAchievements,
        form,
        errors,
        update,
        reset,
        handleAddType,
        handleRemoveType,
        handleSubmit
    }

}