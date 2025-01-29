import BrandingBackground from "@/components/background/branding-background"
import MemoButton from "@/components/button/memo-button"
import MemoInputButton from "@/components/button/memo-input-button"
import MemoCard from "@/components/container/memo-card"
import MemoErrorMessage from "@/components/helper/memo-error-message"
import MemoDatePickerHelper from "@/components/input/helper/memo-date-picker-helper"
import MemoTextAreaInputHelper from "@/components/input/helper/memo-text-area-input-helper"
import MemoTextInputHelper from "@/components/input/helper/memo-text-input-helper"
import MemoAptitudePicker from "@/components/ui/kits/form/memo-aptitude-picker"
import { useDeleteTeacherAchievement, useEditTeacherAchievement, useTeacherAchievementById, useTeacherAchievements } from "@/hooks/useAchievement"
import useForm from "@/hooks/useForm"
import { useTeacherToken } from "@/hooks/useUserToken"
import { getDateISOString, removeHours } from "@/shared/utils/date-util"
import { uuidv4 } from "@/shared/utils/random-util"
import { AxiosError } from "axios"
import { router, useLocalSearchParams } from "expo-router"
import { PlusCircle } from "phosphor-react-native"
import { useEffect, useState } from "react"
import { Alert, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { z, ZodFormattedError } from "zod"

interface EditAchievementForm {
    name: string
    amount: string
    startDate: Date
    endDate: Date
    points: { 
        id: string
        normal: string 
        excellent: string
    }[]
    description: string
}

const MAX_TYPE = 2
const EditAchievementSchema = z.object({
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

export default function TeacherHomeEditScreen() {
    const { id: achievementId } = useLocalSearchParams()
    const { data: teacher } = useTeacherToken()
    const { refetch: refetchAchievements } = useTeacherAchievements()
    const { data, refetch } = useTeacherAchievementById(achievementId as string)
    const { mutateAsync: editAchievement } = useEditTeacherAchievement(achievementId as string)
    const { mutateAsync: deleteAchievement } = useDeleteTeacherAchievement(achievementId as string)
    const achievement = data?.data?.achievementTeacher

    const { form, update, reset } = useForm<EditAchievementForm>(
        {
            name: "",
            amount: "",
            startDate: new Date(),
            endDate: new Date(),
            points: [],
            description: ""
        }
    )
    
    useEffect(() => {
        if (!achievement) return
    
        const formattedData = {
            name: achievement?.name ?? "",
            amount: String(achievement?.people.max ?? ""),
            startDate: new Date(achievement?.sections.startDate),
            endDate: new Date(achievement?.sections.endDate),
            points: achievement?.points?.map(point => ({ 
                id: point.id, 
                normal: String(point.normal), 
                excellent: String(point.excellent) 
            })) ?? [],
            description: achievement?.description ?? "",
        }
        reset(formattedData)
    }, [achievement, reset])
    
    const [errors, setErrors] = useState<ZodFormattedError<EditAchievementForm, string>>()
    const [error, setError] = useState<string>()

    function handleAddType() {
        if (form.points.length >= MAX_TYPE) return
        update("points", [...form.points, { id: "", normal: "", excellent: "" }])
    }
    function handleRemoveType(index: number) {
        const updatedPoints = form.points.filter((_, i) => i !== index)
        update("points", updatedPoints)
    }
    async function handleSubmit() {
        const result = EditAchievementSchema.safeParse(form)

        if (result.success) {
            setErrors(undefined)
            setError(undefined)
            const formattedForm = {
                ...form,
                startDate: getDateISOString(form.startDate),
                endDate:  getDateISOString(form.endDate),
                teacherId: String(teacher?.sub ?? ""),
            }
            // Send request to update achievement
            const result = await editAchievement(formattedForm).catch(error => console.log((error as AxiosError).response?.data))
            
            if (result) {
                router.back()
                refetch()
                refetchAchievements()
            } else {
                setError("เกิดข้อผิดพลาดในการสร้างเป้าหมาย")
            }
        } else {
            const errors = result.error.format()
            setErrors(errors)
            setError("กรุณากรอกข้อมูลทั้งหมดให้ถูกต้อง")
        }
    }

    async function handleDelete() {
        const confirm = () => {
            deleteAchievement()
                .then(result => {
                    if (result) {
                        router.push("/teacher/home")
                        refetchAchievements()
                    }
                })
                .catch((error) => {
                    const errorMessage = (error as AxiosError).response?.data || 'An error occurred while deleting the achievement'
                    console.log(errorMessage)
                })
        }

        Alert.alert("คุณต้องการลบเป้าหมายนี้ใช่ไหม", undefined, [
            {
                text: "ลบ",
                onPress: confirm,
                style: "destructive"
            },
            {
                text: "ยกเลิก",
                style: "cancel"
            }
        ])
    }

    return (
        <BrandingBackground className="justify-end items-center">
        <MemoCard size="full" className="!p-0">
            <KeyboardAwareScrollView>
                <View className="gap-y-lg px-[1.5rem] pb-[1.5rem]">
                    <View className="gap-y-lg">
                        <View className="flex-row gap-x-lg">
                            <MemoDatePickerHelper
                                label="วันที่เปิด"
                                placeholder="วันที่เปิด"
                                value={form.startDate}
                                error={errors?.startDate?._errors[0]}
                                onConfirm={(date) => update("startDate", date)}
                            />
                            <MemoDatePickerHelper
                                label="วันที่ปิด"
                                placeholder="วันที่ปิด"
                                value={form.endDate}
                                error={errors?.endDate?._errors[0]}
                                onConfirm={(date) => update("endDate", date)}
                            />
                        </View>
                        <MemoTextInputHelper
                            label="ชื่อเป้าหมาย"
                            placeholder="ชื่อเป้าหมาย"
                            value={form.name}
                            error={errors?.name?._errors[0]}
                            onChangeText={(text) => update("name", text)}
                        />
                        <MemoTextInputHelper
                            label="จำนวนที่เข้าร่วมได้"
                            placeholder="จำนวนที่เข้าร่วมได้"
                            keyboardType="number-pad"
                            value={form.amount}
                            error={errors?.amount?._errors[0]}
                            onChangeText={(text) => update("amount", text)}
                        />
                        {form?.points.map((point, index) => (
                            <MemoAptitudePicker key={uuidv4()} onRemove={() => handleRemoveType(index)} data={{
                                id: {
                                    value: point.id,
                                    error: errors?.points?.[index]?.id?._errors[0],
                                    onChange: (text) => update(`points.${index}.id`, text),
                                },
                                normal: {
                                    value: point.normal,
                                    error: errors?.points?.[index]?.normal?._errors[0],
                                    onChange: (text) => update(`points.${index}.normal`, text),
                                },
                                excellent: {
                                    value: point.excellent,
                                    error: errors?.points?.[index]?.excellent?._errors[0],
                                    onChange: (text) => update(`points.${index}.excellent`, text),
                                },
                            }} />
                        ))}
                        {form?.points.length < MAX_TYPE && <MemoInputButton
                            icon={PlusCircle}
                            iconVariant="success"
                            name="เพิ่มกลุ่มความถนัด"
                            onPress={handleAddType}
                        />}

                        <MemoTextAreaInputHelper
                            label="รายละเอียด"
                            placeholder="รายละเอียด"
                            value={form.description}
                            error={errors?.description?._errors[0]}
                            onChangeText={(text) => update("description", text)}
                        />
                    </View>
                    <MemoErrorMessage error={error}/>
                    <MemoButton isLoading={false} name="แก้ไขเป้าหมาย" variant="primary" onPress={handleSubmit} />
                    <MemoButton isLoading={false} name="ลบเป้าหมาย" variant="error" onPress={handleDelete} />
                </View>
            </KeyboardAwareScrollView>
        </MemoCard>
    </BrandingBackground>
    )
}