import BrandingBackground from "@/components/background/branding-background";
import MemoContentIconBox from "@/components/container/box/memo-content-icon-box";
import MemoCard from "@/components/container/memo-card";
import MemoPill from "@/components/pill/memo-pill";
import ScrollableView from "@/components/scrollable/scrollable-view";
import MemoSeperator from "@/components/seperator/memo-seperator";
import { useStudentAchievementById } from "@/hooks/useAchievement";
import { formattedPeople, formattedReward, getAptitudeColor } from "@/shared/utils/aptitude-util";
import { formattedDate } from "@/shared/utils/date-util";
import { useLocalSearchParams } from "expo-router";
import { CalendarDots, GraduationCap, Medal, Users } from "phosphor-react-native";
import { Text, View } from "react-native";

export default function StudentDetailScreen() {
    const { id } = useLocalSearchParams()
    const { data } = useStudentAchievementById(id as string ?? "")
    const achievement = data?.data?.achievementStudent

    const date = formattedDate(achievement?.sections?.startDate,achievement?.sections?.endDate)
    const amount = formattedPeople(achievement?.people?.current, achievement?.people?.max)
    const reward = formattedReward(achievement?.points)
    const organizer = achievement?.sections?.organizer
    const description = achievement?.description

    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" className="!p-0 !pt-0 !rounded-t-none">
                <ScrollableView border={false}>
                    {/* <Image source={ImageAssets.diamond} className="w-full h-[200] object-fill" /> */}
                    <View className="flex-col p-[1.5rem] gap-y-sm">
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
                </ScrollableView>
            </MemoCard>
        </BrandingBackground>
    )
}