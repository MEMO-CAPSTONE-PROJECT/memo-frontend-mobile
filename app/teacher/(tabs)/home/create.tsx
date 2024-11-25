import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoCard from "@/components/container/memo-card";
import MemoTextInput from "@/components/input/memo-text-input";
import { View } from "react-native";

export default function TeacherHomeCreateScreen() {
    return (
        <BrandingBackground>
            <MemoCard size="full" className="justify-between">
                <View className="gap-y-lg">
                    <MemoTextInput placeholder="ชื่อเป้าหมาย"/>
                    <MemoTextInput placeholder="จำนวนที่เข้าร่วมได้"/>
                    <MemoTextInput placeholder="รายละเอียด"/>
                </View>
                <MemoButton name="สร้างเป้าหมายใหม่" variant="primary"/>
            </MemoCard>
        </BrandingBackground>
    )
}