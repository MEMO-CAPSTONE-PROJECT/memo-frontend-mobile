import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoCard from "@/components/container/memo-card";
import MemoDatePickerHelper from "@/components/input/helper/memo-date-picker-helper";
import MemoSelectPickerHelper from "@/components/input/helper/memo-select-picker-helper";
import MemoTextAreaInputHelper from "@/components/input/helper/memo-text-area-input-helper";
import MemoTextInputHelper from "@/components/input/helper/memo-text-input-helper";
import KeyboardView from "@/components/scrollable/keyboard-view";
import ScrollableView from "@/components/scrollable/scrollable-view";
import { useState } from "react";
import { View } from "react-native";

export default function TeacherHomeCreateScreen() {
    const [form, setForm] = useState(
        {
            name: "",
            amount: "",
            type: "",
            startDate: new Date(),
            endDate: new Date(),
            point: "",
            description: ""
        }
    )
    function handleSubmit() {
        console.log(form)
    }
    return (
        <KeyboardView>
            <BrandingBackground className="justify-end items-center">
                <MemoCard size="full" className="!p-0">
                    <ScrollableView border={false} className="px-[1.5rem] pb-[1.5rem] gap-y-2xl">
                        <View>
                            <MemoTextInputHelper
                                label="ชื่อเป้าหมาย"
                                placeholder="ชื่อเป้าหมาย"
                                value={form.name}
                                onChangeText={(text) => setForm({ ...form, name: text })}
                            />
                            <MemoTextInputHelper
                                label="จำนวนที่เข้าร่วมได้"
                                placeholder="จำนวนที่เข้าร่วมได้"
                                keyboardType="number-pad"
                                value={form.amount}
                                onChangeText={(text) => setForm({ ...form, amount: text })}
                            />
                            <MemoSelectPickerHelper
                                label="กลุ่มสาระการเรียนรู้"
                                placeholder="กลุ่มสาระการเรียนรู้"
                                items={[{ name: "จิตอาสา" }, { name: "กล้าแสดงออก" }, { name: "ความเป็นผู้นำ" }]}
                                value={form.type}
                                onValueChange={(text) => setForm({ ...form, type: text })}
                            />
                            <View className="flex-row gap-x-lg">
                                <MemoDatePickerHelper
                                    label="วันที่เปิด"
                                    placeholder="วันที่เปิด"
                                    value={form.startDate}
                                    onConfirm={(date) => setForm({ ...form, startDate: date })}
                                />
                                <MemoDatePickerHelper
                                    label="วันที่ปิด"
                                    placeholder="วันที่ปิด"
                                    value={form.endDate}
                                    onConfirm={(date) => setForm({ ...form, startDate: date })}
                                />
                            </View>
                            <MemoTextInputHelper
                                label="จำนวนคะแนน"
                                placeholder="จำนวนคะแนน"
                                keyboardType="number-pad"
                                value={form.point}
                                onChangeText={(text) => setForm({ ...form, point: text })}
                            />
                            <MemoTextAreaInputHelper
                                label="รายละเอียด"
                                placeholder="รายละเอียด"
                                value={form.description}
                                onChangeText={(text) => setForm({ ...form, description: text })}
                            />
                        </View>
                        <MemoButton name="สร้างเป้าหมายใหม่" variant="primary" onPress={handleSubmit} />
                    </ScrollableView>
                </MemoCard>
            </BrandingBackground>
        </KeyboardView>
    )
}