import BrandingBackground from "@/components/background/branding-background"
import MemoButton from "@/components/button/memo-button"
import MemoInputButton from "@/components/button/memo-input-button"
import MemoCard from "@/components/container/memo-card"
import MemoErrorMessage from "@/components/helper/memo-error-message"
import MemoDatePickerHelper from "@/components/input/helper/memo-date-picker-helper"
import MemoTextAreaInputHelper from "@/components/input/helper/memo-text-area-input-helper"
import MemoTextInputHelper from "@/components/input/helper/memo-text-input-helper"
import MemoAptitudePicker from "@/components/ui/kits/form/memo-aptitude-picker"
import useForm from "@/hooks/useForm"
import { useTeacherToken } from "@/hooks/useUserToken"
import { getDateISOString } from "@/shared/utils/date-util"
import { uuidv4 } from "@/shared/utils/random-util"
import { PlusCircle } from "phosphor-react-native"
import { useState } from "react"
import { View } from "react-native"
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
    name: z.string().min(1, "กรุณาใส่ชื่อเป้าหมาย"),
    amount: z.string().min(1, "กรุณาใส่จำนวนที่เข้าร่วม"),
    startDate: z.date({ message: "กรุณาใส่เวลาเปิด" }),
    endDate: z.date({ message: "กรุณาใส่เวลาปิด" }),
    points: z.array(
        z.object({
            id: z.string().min(1, "กรุณาใส่กลุ่มความถนัด"),
            normal: z.string().min(1, "กรุณาใส่คะแนนคนที่ผ่าน"),
            excellent: z.string().min(1, "กรุณาใส่คะแนนคนเก่ง")
        }
    )),
    description: z.string().min(1, "กรุณาใส่รายละเอียด")
})

export default function TeacherHomeEditScreen() {
    const { data: teacher } = useTeacherToken()
    const [types, setTypes] = useState(0)
    const { form, update } = useForm<EditAchievementForm>(
        {
            name: "",
            amount: "",
            startDate: new Date(),
            endDate: new Date(),
            points: [],
            description: ""
        }
    )
    const [errors, setErrors] = useState<ZodFormattedError<EditAchievementForm, string>>()
    const [error, setError] = useState<string>()

    function handleAddType() {
        if (types > MAX_TYPE) return
        update("points", [...form.points, { id: "", normal: "", excellent: "" }])
        setTypes(types + 1)
    }
    function handleRemoveType(index: number) {
        if (types <= 0 || index >= types) return
        setTypes(types - 1)
        
        // Remove the point and its corresponding UI node by index
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
                teacherId: String(teacher?.sub ?? ""),
                startDate: getDateISOString(form.startDate),
                endDate: getDateISOString(form.endDate),
            }
            // TODO: Send request to update achievement
            console.log(formattedForm)
        } else {
            const errors = result.error.format()
            setErrors(errors)
            setError("กรุณากรอกข้อมูลทั้งหมดให้ถูกต้อง")
        }
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
                        {Array.from({ length: Math.min(types, MAX_TYPE) }).map((_, i) => (
                            <MemoAptitudePicker
                                key={uuidv4()}
                                onRemove={() => handleRemoveType(i)}
                                data={{
                                    id: {
                                        value: form.points[i]?.id,
                                        error: errors?.points?.[i]?.id?._errors[0],
                                        onChange: (text) => update(`points.${i}.id`, text),
                                    },
                                    normal: {
                                        value: form.points[i]?.normal,
                                        error: errors?.points?.[i]?.normal?._errors[0],
                                        onChange: (text) => update(`points.${i}.normal`, text),
                                    },
                                    excellent: {
                                        value: form.points[i]?.excellent,
                                        error: errors?.points?.[i]?.excellent?._errors[0],
                                        onChange: (text) => update(`points.${i}.excellent`, text),
                                    },
                                }}
                            />
                        ))}
                        {types < MAX_TYPE && <MemoInputButton
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
                    <MemoButton isLoading={false} name="สร้างเป้าหมายใหม่" variant="primary" onPress={handleSubmit} />
                </View>
            </KeyboardAwareScrollView>
        </MemoCard>
    </BrandingBackground>
    )
}