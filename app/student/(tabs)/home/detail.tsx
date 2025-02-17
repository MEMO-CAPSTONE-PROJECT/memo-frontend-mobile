import BrandingBackground from "@/components/background/branding-background";
import MemoIconTextButton from "@/components/button/memo-icon-text-button";
import MemoCard from "@/components/container/memo-card";
import ScrollableView from "@/components/scrollable/scrollable-view";
import MemoContentDetail from "@/components/ui/kits/container/memo-content-detail";
import MemoDetailSkeleton from "@/components/ui/kits/skeleton/memo-detail-skeleton";
import MemoCouponModal from "@/components/ui/modal/memo-coupon-modal";
import { useJoinAchievementMutation } from "@/hooks/achievement/useAchievementMutation";
import { useStudentAchievementByIdQuery } from "@/hooks/achievement/useAchievementQuery";
import { useSubmitAchievementCodeMutation } from "@/hooks/query/useCodeMutation";
import { useStudentToken } from "@/hooks/useUserToken";
import { formattedTotalScore } from "@/shared/utils/aptitude-util";
import { AxiosError } from "axios";
import { useLocalSearchParams } from "expo-router";
import { NotePencil, QrCode } from "phosphor-react-native";
import { Alert, Text, View } from "react-native";

export default function StudentDetailScreen() {
    const { id: achievementId } = useLocalSearchParams()
    const { data: student} = useStudentToken()
    const { data, isLoading, isError, refetch: refetchAchievement } = useStudentAchievementByIdQuery(achievementId as string, { studentId: student?.sub ?? "all" })
    const { mutateAsync: joinAchievement } = useJoinAchievementMutation()
    const { mutateAsync: submitCode } = useSubmitAchievementCodeMutation()
    const achievement = data?.data?.achievementStudent

    const participant = achievement?.participants
    const isParticipant = participant?.status !== undefined
    const isSuccess = participant?.status === true
    const isOpen = achievement?.isOpen ?? false
    const isMax = achievement?.people.current === achievement?.people.max

    function getStatus() {
        if (isSuccess) return { name: "ทำสำเร็จแล้ว", color: "text-system-green" }
        else if (isParticipant) return { name: "กำลังทำเป้าหมายนี้อยู่", color: "text-system-blue" }
        else if (!isOpen) return { name: "ยังไม่เปิดลงทะเบียน", color: "text-system-error" }
        else if (isMax) return { name: "คนสมัครครบจำนวนแล้ว", color: "text-system-error" }
        return { name: "ลงทะเบียนได้", color: "text-system-green" }
    }

    const disabledCodeButton = !isParticipant || isSuccess
    const disabledJoinButton = isParticipant || !isOpen || isMax
    const { name: statusName, color: statusColor } = getStatus()

    const handleJoinAchievement = async () => {
        try {
            const response = await joinAchievement({ 
                studentId: String(student?.sub ?? ""), 
                achievementId: achievementId as string
            })
            
            if (response) {
                Alert.alert("สำเร็จ", "คุณได้สมัครเป้าหมายสำเร็จ", [
                    { text: "ตกลง", style: "cancel" }
                ])
                refetchAchievement()
            } else {
                Alert.alert("ล้มเหลว", "คุณไม่สามารถสมัครเป้าหมายได้", [
                    { text: "ตกลง", style: "cancel" }
                ])
            }
        } catch {
            Alert.alert("ล้มเหลว", "คุณไม่สามารถสมัครเป้าหมายได้", [
                { text: "ตกลง", style: "cancel" }
            ])
        }
    }
    const handleSubmitCode = async (code: string) => {
        try {
            const response = await submitCode({
                studentId: String(student?.sub ?? ""),
                achievementId: achievementId as string,
                code: code
            })
            const title = response ? "สำเร็จ" : "ล้มเหลว"
            const message = response ? "คุณได้รับคะแนนสำเร็จ\n" + formattedTotalScore(response.data.totalScore) : "ชุดรหัสไม่ถูกต้อง"
            Alert.alert(title, message, [
                { text: "ตกลง", style: "cancel" }
            ])
            refetchAchievement()
        } catch (error) {
            console.log(error)

            const errorMessage = error instanceof AxiosError ? error.response?.data?.error : "ชุดรหัสไม่ถูกต้อง"
            Alert.alert("ล้มเหลว", errorMessage ?? "เกิดข้อผิดพลาดกับชุดรหัส", [
                { text: "ตกลง", style: "cancel" }
            ])
        }
    }

    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" className="!p-0 !pt-0 !rounded-t-none">
                <ScrollableView border={false}>
                    <MemoDetailSkeleton isLoading={isLoading || isError}>
                        <MemoContentDetail achievement={achievement}>
                            <View className="p-[1.5rem] flex-col gap-y-md">
                                <Text className="font-kanit-regular text-body text-title-1">
                                    สถานะ <Text className={statusColor}>{statusName}</Text>
                                </Text>
                                <MemoCouponModal onSubmit={handleSubmitCode}>
                                    {(setVisible) => (
                                        <MemoIconTextButton 
                                            name="กรอกรหัส" 
                                            icon={QrCode} 
                                            variant="secondary" 
                                            disabled={disabledCodeButton} 
                                            onPress={() => setVisible(true)} 
                                        />
                                    )}
                                </MemoCouponModal>
                                <MemoIconTextButton 
                                    name={"ลงทะเบียน"} 
                                    icon={NotePencil} 
                                    variant="primary" 
                                    disabled={disabledJoinButton} 
                                    onPress={handleJoinAchievement}
                                />
                            </View>  
                        </MemoContentDetail>
                    </MemoDetailSkeleton>
                </ScrollableView>
            </MemoCard>
        </BrandingBackground>
    )
}