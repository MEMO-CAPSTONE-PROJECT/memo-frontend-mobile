import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoSelectionButton from "@/components/button/memo-selection-button";
import MemoTextButton from "@/components/button/memo-text-button";
import MemoCard from "@/components/container/memo-card";
import MemoLongCard from "@/components/container/memo-long-card";
import { MemoTimer } from "@/components/timer/memo-timer";
import { Color } from "@/constants/theme/color";
import { useAchievementCode } from "@/hooks/useCode";
import { getTimeMinuteSecond } from "@/shared/utils/date-util";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRCodeScreen() {
    const TIMER = 300 //in seconds
    const [excellent, setExcellent] = useState(false)
    const { id } = useLocalSearchParams()
    const buttons = [
        { name: "นักเรียนที่ผ่าน", active: !excellent, onPress: () => setExcellent(false)},
        { name: "นักเรียนที่โดดเด่น", active: excellent, onPress: () => setExcellent(true)},
    ]
    const { data, refetch } = useAchievementCode(id as string ?? "")
    const QRCodeRawData = JSON.stringify(
        { achievementId: id, code: data?.data?.code }
    )
    if (!QRCodeRawData) return <View></View>

    const QRCodeData = JSON.parse(QRCodeRawData) as { achievementId: string, code?: string }
    return (
        <BrandingBackground>
            <MemoCard size="full" className="items-center gap-y-3xl">
                <MemoSelectionButton buttons={buttons}/>
                <View className="w-full px-[1.5rem] gap-y-xl">
                    <View className="border-lg border-system-blue rounded-md w-full items-center justify-center aspect-square">
                        <QRCode color={Color["title-1"]} value={QRCodeRawData} size={230} />  
                    </View>
                    <MemoLongCard>
                        <Text className="font-kanit-bold text-title-1 text-section">{QRCodeData.code}</Text>
                    </MemoLongCard>
                    <MemoTimer initialTime={TIMER}>
                        {(time, reset) => (
                            <View className="flex-row justify-between">
                                <Text className="text-body-2 font-kanit-regular text-caption-1">
                                    รหัสจะหมดอายุใน {getTimeMinuteSecond(time)} นาที
                                </Text>
                                <MemoTextButton
                                    name="สร้างใหม่?"
                                    onPress={() => {
                                        reset()
                                        refetch()
                                    }}
                                    disabled={time > 0}
                                />
                            </View>
                        )}
                    </MemoTimer>
                    <MemoButton variant="primary" name="แก้ไขเกณฑ์คะแนนกิจกรรม"/>
                </View>
            </MemoCard>
        </BrandingBackground>
    )
}