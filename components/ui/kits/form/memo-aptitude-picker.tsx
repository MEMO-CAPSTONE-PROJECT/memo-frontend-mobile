import MemoDeleteButton from "@/components/button/memo-delete-button";
import MemoSelectPickerHelper from "@/components/input/helper/memo-select-picker-helper";
import MemoTextInputHelper from "@/components/input/helper/memo-text-input-helper";
import { Fragment } from "react";
import { View } from "react-native";

interface MemoAptitudePickerProps {
    data: {
        id: {
            value?: string
            error?: string
            onChange?: (text: string) => void
        }
        normal: {
            value?: string
            error?: string
            onChange?: (text: string) => void
        }
        excellent: {
            value?: string
            error?: string
            onChange?: (text: string) => void
        }
    }
    onRemove: () => void
}

const MEMO_TYPES = [
    { name: "จิตอาสา", value: "volunteer" }, 
    { name: "ความกล้าแสดงออก", value: "self-confident" }, 
    { name: "ความเป็นผู้นำ", value: "leadership" },
    { name: "ความแข่งขัน", value: "competition" },
    { name: "ความมีระเบียบวินัย", value: "discipline" },
    { name: "ความรับผิดชอบ", value: "responsibility" },
]

export default function MemoAptitudePicker({ data, onRemove }: Readonly<MemoAptitudePickerProps>) {
    return (
        <Fragment>
            <MemoSelectPickerHelper
                label="กลุ่มสาระการเรียนรู้"
                rightIcon={() => MemoDeleteButton({
                    onPress: onRemove
                })}
                placeholder="กลุ่มสาระการเรียนรู้"
                items={MEMO_TYPES}
                value={data.id?.value}
                error={data.id?.error}
                onValueChange={data.id?.onChange}
            />
            <View className="w-full flex-1 flex-row gap-x-lg">
                <MemoTextInputHelper
                    placeholder="คะแนนคนที่ผ่าน"
                    keyboardType="number-pad"
                    value={data.normal?.value}
                    error={data.normal?.error}
                    onChangeText={data.normal?.onChange}
                />
                <MemoTextInputHelper
                    placeholder="คะแนนคนเก่ง"
                    keyboardType="number-pad"
                    value={data.excellent?.value}
                    error={data.excellent?.error}
                    onChangeText={data.excellent?.onChange}
                />
            </View>
        </Fragment>
    )
}