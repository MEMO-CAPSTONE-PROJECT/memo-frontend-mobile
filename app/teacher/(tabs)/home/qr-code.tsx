import BrandingBackground from "@/components/background/branding-background";
import MemoSelectionButton from "@/components/button/memo-selection-button";
import MemoTextButton from "@/components/button/memo-text-button";
import MemoCard from "@/components/container/memo-card";
import MemoLongCard from "@/components/container/memo-long-card";
import ScrollableView from "@/components/scrollable/scrollable-view";
import { MemoTimer } from "@/components/timer/memo-timer";
import { Color } from "@/constants/theme/color";
import { useAchievementCodeQuery } from "@/hooks/query/useCodeQuery";
import { getTimeMinuteSecond } from "@/shared/utils/date-util";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRCodeScreen() {
    const TIMER = 300 //in seconds
    const [excellent, setExcellent] = useState(false)
    const { id, name } = useLocalSearchParams()
    const buttons = [
        { name: "นักเรียนที่ผ่าน", active: !excellent, onPress: () => setExcellent(false)},
        { name: "นักเรียนที่โดดเด่น", active: excellent, onPress: () => setExcellent(true)},
    ]
    const { data, refetch } = useAchievementCodeQuery(id as string ?? "")
    const QRCodeRawData = JSON.stringify(
        { 
            achievementId: id, 
            code: excellent ? data?.data?.excellenceCode : data?.data?.normalCode 
        }
    )
    if (!QRCodeRawData) return <View></View>

    const QRCodeData = JSON.parse(QRCodeRawData) as { achievementId: string, code?: string }
    return (
        <BrandingBackground>
            <MemoCard size="full" className="items-center gap-y-3xl">
                <MemoSelectionButton buttons={buttons}/>
                <ScrollableView className="w-full px-[1.5rem] gap-y-xl items-center" border={false} scrollClassName="w-full">
                    <View className="bg-primary-3 rounded-md w-[310] items-center justify-center h-[350] p-xl gap-y-xl">
                        <View className="bg-system-white p-3xl justify-center items-center rounded-sm">
                            <QRCode color={Color["title-1"]} value={QRCodeRawData} size={200} />  
                        </View>
                        <Text className="font-kanit-bold text-system-white text-body">@{name}</Text>
                    </View>
                    <MemoLongCard>
                        <Text className="font-kanit-bold text-title-1 text-section">{QRCodeData.code}</Text>
                    </MemoLongCard>
                    <MemoTimer initialTime={TIMER}>
                        {(time, reset) => (
                            <View className="w-full flex-row justify-between">
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
                    {/* <MemoButton variant="primary" name="แก้ไขเกณฑ์คะแนนกิจกรรม"/> */}
                </ScrollableView>
            </MemoCard>
        </BrandingBackground>
    )
}