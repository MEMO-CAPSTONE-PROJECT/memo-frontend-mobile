import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoInputButton from "@/components/button/memo-input-button";
import MemoCard from "@/components/container/memo-card";
import MemoDatePickerHelper from "@/components/input/helper/memo-date-picker-helper";
import MemoSelectPickerHelper from "@/components/input/helper/memo-select-picker-helper";
import MemoTextAreaInputHelper from "@/components/input/helper/memo-text-area-input-helper";
import MemoTextInputHelper from "@/components/input/helper/memo-text-input-helper";
import useForm from "@/hooks/useForm";
import { uuidv4 } from "@/shared/utils";
import { PlusCircle } from "phosphor-react-native";
import React, { Fragment, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { z, ZodFormattedError } from "zod";

interface CreateAchievementForm {
    name: string;
    amount: string;
    startDate: Date;
    endDate: Date;
    points: { 
        type: string; 
        point: string 
    }[]
    description: string;
}
const MAX_TYPE = 3
const MEMO_TYPES = [
    { name: "จิตอาสา" }, 
    { name: "กล้าแสดงออก" }, 
    { name: "ความเป็นผู้นำ" }
]

const CreateAchievementSchema = z.object({
    name: z.string().min(1, "กรุณาใส่ชื่อเป้าหมาย"),
    amount: z.string().min(1, "กรุณาใส่จำนวนที่เข้าร่วม"),
    startDate: z.date({ message: "กรุณาใส่เวลาเปิด" }),
    endDate: z.date({ message: "กรุณาใส่เวลาปิด" }),
    points: z.array(
        z.object({
            type: z.string().min(1, "กรุณาใส่กลุ่มสาระการเรียนรู้"),
            point: z.string().min(1, "กรุณาใส่คะแนน")
        }
    )),
    description: z.string().min(1, "กรุณาใส่รายละเอียด")
})

export default function TeacherHomeCreateScreen() {
    const [types, setTypes] = useState(0)
    const { form, update } = useForm<CreateAchievementForm>(
        {
            name: "",
            amount: "",
            startDate: new Date(),
            endDate: new Date(),
            points: [],
            description: ""
        }
    )
    const [errors, setErrors] = useState<ZodFormattedError<CreateAchievementForm, string>>()
    function handleAddType() {
        if (types > MAX_TYPE) return
        update("points", [...form.points, { type: "", point: ""}])
        setTypes(types + 1)
    }
    function handleRemoveType(index: number) {
        if (types <= 0 || index >= types) return
        setTypes(types - 1)
        
        // Remove the point and its corresponding UI node by index
        const updatedPoints = form.points.filter((_, i) => i !== index)
        update("points", updatedPoints)
    }
    function handleSubmit() {
        const result = CreateAchievementSchema.safeParse(form)

        if (result.success) {
            setErrors(undefined)
            console.log("PASSING " + form)
        } else {
            const errors = result.error.format()
            setErrors(errors)
        }
    }

    function RightIcon(index: number) {
        return (
            <Pressable onPress={() => handleRemoveType(index)} className="bg-system-error rounded-xsm px-md">
                <Text className="font-kanit-medium text-caption-1 text-system-white">ลบกลุ่มนี้</Text>
            </Pressable>
        )
    }
    function getTypes() {
        const children: React.ReactNode[] = []
        for (let i = 0; i < types && i < MAX_TYPE; i++) {
            children.push(
                <Fragment key={uuidv4()}>
                    <MemoSelectPickerHelper
                        label="กลุ่มสาระการเรียนรู้"
                        rightIcon={() => RightIcon(i)}
                        placeholder="กลุ่มสาระการเรียนรู้"
                        items={MEMO_TYPES}
                        value={form.points[i]?.type}
                        error={errors?.points?.[i]?.type?._errors[0]}
                        onValueChange={(text) => update(`points.${i}.type`, text)}
                    />
                    <MemoTextInputHelper
                        placeholder="จำนวนคะแนน"
                        keyboardType="number-pad"
                        value={form.points[i]?.point}
                        error={errors?.points?.[i]?.point?._errors[0]}
                        onChangeText={(text) => update(`points.${i}.point`, text)}
                    />
                </Fragment>
            )
        }
        return children
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
                            {getTypes()}
                            {types < MAX_TYPE && <MemoInputButton
                                icon={PlusCircle}
                                iconVariant="success"
                                name="เพิ่มกลุ่มสาระการเรียนรู้"
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
                        <MemoButton name="สร้างเป้าหมายใหม่" variant="primary" onPress={handleSubmit} />
                    </View>
                </KeyboardAwareScrollView>
            </MemoCard>
        </BrandingBackground>
    )
}