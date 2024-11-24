import { useAuth } from "@/app/context/AuthContext";
import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoCard from "@/components/container/memo-card";
import MemoCharacterCard from "@/components/container/memo-character-card";
import ScrollableView from "@/components/scrollable/scrollable-view";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function ParentStudentsScreen() {
    const [active, setActive] = useState<number>(-1)
    const { login } = useAuth()
    const router = useRouter()
    const students = [
        { id: "19528", name: "ด.ญ. พิณ อิอิจ่ะ", gender: "หญิง", classroom: "5/2" },
        { id: "19529", name: "ด.ญ. พิณ อิอิจ่ะ", gender: "หญิง", classroom: "5/2" },
        { id: "19530", name: "ด.ช. พิณ อิอิจ่ะ", gender: "ชาย", classroom: "5/2" },
        { id: "19531", name: "ด.ช. พิณ อิอิจ่ะ", gender: "ชาย", classroom: "5/2" },
    ]
    async function handleSelectStudent() {
        const result = await login?.("thannicha.xxxxx@gmail.com", "123456")
        if (result && result.error) {
            alert(result.error)
        } else {
            router.navigate("/parent/home")
        }
    }

    return (
        <BrandingBackground variant="secondary" className="justify-end items-center">
            <MemoCard className="justify-between">
                <View className="flex-[1] gap-y-xl">
                    <View className="flex justify-center items-center">
                        <Text className="font-kanit-bold text-title text-body-1">
                            บุตรหลานของท่านจำนวน {students.length} คน
                        </Text>
                        <Text className="font-kanit-regular text-body text-body-2">
                            กรุณาเลือกบุตรหลานที่ท่านต้องการเข้าใช้ระบบ
                        </Text>
                    </View>
                    <ScrollableView gap={true} scrollEnabled={students.length > 3} className="gap-y-lg">
                        {students.map((student, index) =>
                            <MemoCharacterCard
                                key={student.id}
                                gender={student.gender}
                                active={index === active}
                                onPress={() => setActive(index)}
                                texts={[
                                    { text: student.name, extraClassName: "font-kanit-bold text-title" },
                                    { text: `รหัสนักเรียน ${student.id}`, extraClassName: "font-kanit-regular text-body" },
                                    { text: `ชั้น ป.${student.classroom}`, extraClassName: "font-kanit-regular text-body" },
                                ]}
                            />
                        )}
                    </ScrollableView>
                </View>
                <View className="gap-y-lg">
                    <MemoButton name="ยืนยัน" variant="primary" onPress={handleSelectStudent}/>
                    <Link href="/" asChild>
                        <MemoButton name="กลับสู่หนัาเริ่มต้น" variant="ghost" />
                    </Link>
                </View>
            </MemoCard>
        </BrandingBackground>
    )
}