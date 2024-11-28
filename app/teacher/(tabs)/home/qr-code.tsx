import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoSelectionButton from "@/components/button/memo-selection-button";
import MemoCard from "@/components/container/memo-card";
import MemoLongCard from "@/components/container/memo-long-card";
import { Color } from "@/constants/theme/color";
import { Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRCodeScreen() {
    const buttons = [
        { name: "นักเรียนที่ผ่าน", active: false, onPress: () => {}},
        { name: "นักเรียนที่โดดเด่น", active: true, onPress: () => {}},
    ]
    const QR_CODE_ID = "230870"
    return (
        <BrandingBackground>
            <MemoCard size="full" className="items-center gap-y-3xl">
                <MemoSelectionButton buttons={buttons}/>
                <View className="w-full px-[1.5rem] gap-y-xl">
                    <View className="border-lg border-system-blue rounded-md w-full items-center justify-center aspect-square">
                        <QRCode color={Color["title-1"]} value={QR_CODE_ID} size={230} />  
                    </View>
                    <MemoLongCard>
                        <Text className="font-kanit-bold text-title-1 text-section">{QR_CODE_ID}</Text>
                    </MemoLongCard>
                    <MemoButton variant="primary" name="แก้ไขเกณฑ์คะแนนกิจกรรม"/>
                </View>
            </MemoCard>
        </BrandingBackground>
    )
}