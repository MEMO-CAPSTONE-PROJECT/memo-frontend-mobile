import BrandingBackground from "@/components/background/branding-background";
import MemoIconTextButton from "@/components/button/memo-icon-text-button";
import MemoContentIconBox from "@/components/container/box/memo-content-icon-box";
import MemoCard from "@/components/container/memo-card";
import MemoPill from "@/components/pill/memo-pill";
import ScrollableView from "@/components/scrollable/scrollable-view";
import MemoSeperator from "@/components/seperator/memo-seperator";
import MemoDetailSkeleton from "@/components/ui/kits/skeleton/memo-detail-skeleton";
import MemoCouponModal from "@/components/ui/modal/memo-coupon-modal";
import { useJoinAchievementMutation } from "@/hooks/achievement/useAchievementMutation";
import { useStudentAchievementByIdQuery } from "@/hooks/achievement/useAchievementQuery";
import { useSubmitAchievementCodeMutation } from "@/hooks/query/useCodeMutation";
import { useStudentToken } from "@/hooks/useUserToken";
import { formattedPeople, formattedReward, getAptitudeColor } from "@/shared/utils/aptitude-util";
import { formattedDate } from "@/shared/utils/date-util";
import { AxiosError } from "axios";
import { useLocalSearchParams } from "expo-router";
import { CalendarDots, GraduationCap, Medal, NotePencil, QrCode, Users } from "phosphor-react-native";
import { Alert, Text, View } from "react-native";

export default function StudentDetailScreen() {
    const { id: achievementId } = useLocalSearchParams()
    const { data: student} = useStudentToken()
    const { data, isLoading, isError } = useStudentAchievementByIdQuery(achievementId as string)
    const { mutateAsync: joinAchievement } = useJoinAchievementMutation()
    const { mutateAsync: submitCode } = useSubmitAchievementCodeMutation()
    const achievement = data?.data?.achievementStudent
    
    const date = formattedDate(achievement?.sections?.startDate, achievement?.sections?.endDate)
    const amount = formattedPeople(achievement?.people?.current, achievement?.people?.max)
    const reward = formattedReward(achievement?.points)
    const organizer = achievement?.sections?.organizer
    const description = achievement?.description

    const handleJoinAchievement = async () => {
        const response = await joinAchievement({ 
            studentId: String(student?.sub ?? ""), 
            achievementId: achievementId as string
        })
        
        if (response) {
            Alert.alert("สำเร็จ", "คุณได้สมัครเป้าหมายสำเร็จ", [
                {
                    text: "ตกลง",
                    style: "cancel"
                }
            ])
        } else {
            Alert.alert("ล้มเหลว", "คุณไม่สามารถสมัครเป้าหมายได้", [
                {
                    text: "ตกลง",
                    style: "cancel"
                }
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
            const message = response ? "คุณได้รับคะแนนสำเร็จ" : "ชุดรหัสไม่ถูกต้อง"
            Alert.alert(title, message, [
                { text: "ตกลง", style: "cancel" }
            ])
        } catch (error) {
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
                        {/* <Image source={ImageAssets.diamond} className="w-full h-[200] object-fill" /> */}
                        <View className="p-[1.5rem] flex-row justify-between">
                            <View className="flex-1 flex-col gap-y-sm">
                                <Text className="font-kanit-bold text-title text-title-1">{achievement?.name}</Text>
                                <View className="flex-row gap-x-md">
                                    {achievement?.points?.map((point, index) => {
                                        const detail = point.details?.[0]
                                        const color = getAptitudeColor(detail?.color)
                                        return (
                                            <MemoPill
                                                key={index + "_" + detail?.type}
                                                name={detail?.type}
                                                borderColor={color?.color}
                                                backgroundColor={color?.light}
                                                textColor={color?.color}
                                            />
                                        )
                                    })}
                                </View>
                            </View>
                        </View>
                        <MemoSeperator />
                        <View className="flex p-[1.5rem] gap-y-lg">
                            <MemoContentIconBox
                                title={"รางวัล"}
                                detail={reward}
                                icon={Medal}
                                variant={"secondary"}
                            />
                            <MemoContentIconBox
                                title={"วันที่ปิดรับ"}
                                detail={date}
                                icon={CalendarDots}
                                variant={"primary"}
                            />
                            <MemoContentIconBox
                                title={"คุณครูผู้ดูแล"}
                                detail={organizer}
                                icon={GraduationCap}
                                variant={"primary"}
                            />
                            <MemoContentIconBox
                                title={"จำนวนผู้สมัคร"}
                                detail={amount}
                                icon={Users}
                                variant={"primary"}
                            />
                            <View className="gap-y-sm">
                                <Text className="font-kanit-bold text-title text-title-1">รายละเอียด</Text>
                                <Text className="font-kanit-regular text-body text-body-1">{description}</Text>
                            </View>
                        </View>
                        <MemoSeperator />
                        <View className="p-[1.5rem] flex-col gap-y-md">
                            <MemoCouponModal onSubmit={handleSubmitCode}>
                                {(setVisible) => (
                                    <MemoIconTextButton name="กรอกรหัส" icon={QrCode} variant="secondary" onPress={() => setVisible(true)} />
                                )}
                            </MemoCouponModal>
                            <MemoIconTextButton 
                                name="ลงทะเบียน" 
                                icon={NotePencil} 
                                variant="primary" 
                                disabled={!achievement?.isOpen} 
                                onPress={handleJoinAchievement}
                            />
                        </View>
                    </MemoDetailSkeleton>
                </ScrollableView>
            </MemoCard>
        </BrandingBackground>
    )
}