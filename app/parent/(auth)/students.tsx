import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoCard from "@/components/container/memo-card";
import MemoCharacterCard from "@/components/container/memo-character-card";
import MemoErrorMessage from "@/components/helper/memo-error-message";
import ScrollableView from "@/components/scrollable/scrollable-view";
import { useParentByPhoneNumberQuery } from "@/hooks/query/useUserQuery";
import { useParentToken } from "@/hooks/useUserToken";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function ParentStudentsScreen() {
    const [active, setActive] = useState<number>(-1)
    const [error, setError] = useState<string>()
    const [studentId, setStudentId] = useState<string>()
    const { data: parent } = useParentToken()
    const { data } = useParentByPhoneNumberQuery(parent?.phoneNumber ?? "")
    const students = data?.data?.parent?.students ?? []

    function handleCardPress(index: number, studentId: string) {
        setActive(index)
        setStudentId(studentId)
    }

    function handleSubmit() {
        if (!studentId) {
            setError("กรุณาเลือกบุตรหลานของคุณก่อน")
            return
        }
        router.replace({ pathname: "/parent/home", params: { studentId: studentId } })
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
                                key={student.studentId}
                                gender={student.gender}
                                active={index === active}
                                onPress={() => handleCardPress(index, student.studentId)}
                                texts={[
                                    { text: `${student.firstName} ${student.lastName}`, extraClassName: "font-kanit-bold text-title" },
                                    { text: `รหัสนักเรียน ${student.studentId}`, extraClassName: "font-kanit-regular text-body" },
                                    { text: `ชั้น ป.${student.classLevel}/${student.classRoom}`, extraClassName: "font-kanit-regular text-body" },
                                ]}
                            />
                        )}
                    </ScrollableView>
                </View>
                <View>
                    <MemoErrorMessage error={error}/>
                    <View className="gap-y-lg">
                        <MemoButton name="ยืนยัน" variant="primary" onPress={handleSubmit}/>
                        <Link href="/" asChild>
                            <MemoButton name="กลับสู่หนัาเริ่มต้น" variant="ghost" />
                        </Link>
                    </View>
                </View>
            </MemoCard>
        </BrandingBackground>
    )
}