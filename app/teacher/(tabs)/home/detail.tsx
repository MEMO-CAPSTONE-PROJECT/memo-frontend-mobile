import BrandingBackground from "@/components/background/branding-background";
import MemoIconTextButton from "@/components/button/memo-icon-text-button";
import MemoContentIconBox from "@/components/container/box/memo-content-icon-box";
import MemoCard from "@/components/container/memo-card";
import MemoPill from "@/components/pill/memo-pill";
import ScrollableView from "@/components/scrollable/scrollable-view";
import MemoSeperator from "@/components/seperator/memo-seperator";
import MemoDetailSkeleton from "@/components/ui/kits/skeleton/memo-detail-skeleton";
import { useTeacherAchievementByIdQuery } from "@/hooks/achievement/useAchievementQuery";
import { useTeacherToken } from "@/hooks/useUserToken";
import { formattedPeople, formattedReward, getAptitudeColor } from "@/shared/utils/aptitude-util";
import { formattedDate } from "@/shared/utils/date-util";
import { router, useLocalSearchParams } from "expo-router";
import { CalendarDots, GraduationCap, Medal, NotePencil, QrCode, Users } from "phosphor-react-native";
import { Fragment } from "react";
import { Text, View } from "react-native";

export default function TeacherDetailScreen() {
    const { id } = useLocalSearchParams()
    const { data, isLoading, isError } = useTeacherAchievementByIdQuery(id as string)
    const achievement = data?.data?.achievementTeacher
    const { data: teacher } = useTeacherToken()

    function handleEdit() {
        router.push({
            pathname: "/teacher/home/edit",
            params: { id: id }
        })
    }
    function handleCreateQRCode() {
        router.push({
            pathname: "/teacher/home/qr-code",
            params: { id: id }
        })
    }

    const isOwner = teacher?.sub === achievement?.teacherId
    const date = formattedDate(achievement?.sections?.startDate, achievement?.sections?.endDate)
    const amount = formattedPeople(achievement?.people?.current, achievement?.people?.max)
    const reward = formattedReward(achievement?.points)
    const organizer = achievement?.sections?.organizer
    const description = achievement?.description

    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" className="!p-0 !pt-0 !rounded-t-none">
                <ScrollableView border={false}>
                    <MemoDetailSkeleton isLoading={isLoading || isError}>
                        {/* <Image source={achievement.src} className="w-full h-[200] object-fill" /> */}
                        <View className="p-[1.5rem] flex-row justify-between">
                            <View className="flex-1 flex-col gap-y-sm">
                                <Text className="font-kanit-bold text-title text-title-1">{achievement?.name}</Text>
                                <View className="flex-row flex-wrap gap-md">
                                    {achievement?.points?.map((point, index) => {
                                        const achievement = point.details?.[0]
                                        const color = getAptitudeColor(achievement?.color)
                                        return (
                                            <MemoPill
                                                key={index + "_" + achievement?.type}
                                                name={achievement?.type}
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
                        {isOwner && 
                            <Fragment>
                                <MemoSeperator />
                                <View className="p-[1.5rem] flex-col gap-y-md">
                                    <MemoIconTextButton name="สร้าง" icon={QrCode} variant="secondary" onPress={handleCreateQRCode} />
                                    <MemoIconTextButton name="แก้ไข" icon={NotePencil} variant="darkRed" onPress={handleEdit} />
                                </View>
                            </Fragment>
                        }
                    </MemoDetailSkeleton>
                </ScrollableView>
            </MemoCard>
        </BrandingBackground >
    )
}