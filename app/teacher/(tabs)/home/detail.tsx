import BrandingBackground from "@/components/background/branding-background";
import MemoContentIconBox from "@/components/container/box/memo-content-icon-box";
import MemoCard from "@/components/container/memo-card";
import MemoPill from "@/components/pill/memo-pill";
import ScrollableView from "@/components/scrollable/scrollable-view";
import MemoSeperator from "@/components/seperator/memo-seperator";
import { Color } from "@/constants/theme/color";
import { useTeacherAchievementById } from "@/hooks/useAchievement";
import { useTeacherToken } from "@/hooks/useUserToken";
import { getAptitudeColor } from "@/shared/utils/aptitude-util";
import { router, useLocalSearchParams } from "expo-router";
import { CalendarDots, GraduationCap, Medal, PencilSimple, QrCode, Users } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function TeacherDetailScreen() {
    const { id } = useLocalSearchParams()
    const { data } = useTeacherAchievementById(id as string ?? "")
    const detail = data?.data?.achievementTeacher
    const { data: teacher } = useTeacherToken()

    function handleEdit() {
        router.push("/teacher/home/edit")
    }
    function handleCreateQRCode() {
        router.push("/teacher/home/qr-code")
    }

    const isOwner = teacher?.sub === detail?.teacherId
    const date = detail?.sections.startDate + "-" + detail?.sections.endDate
    const amount = `จำนวนผู้สมัคร ${detail?.people.current} จาก ${detail?.people.max}`

    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" className="!p-0 !pt-0 !rounded-t-none">
                <ScrollableView border={false}>
                    {/* <Image source={detail.src} className="w-full h-[200] object-fill" /> */}
                    <View className="p-[1.5rem] flex-row justify-between">
                        <View className="flex-col gap-y-sm">
                            <Text className="font-kanit-bold text-title text-title-1">{detail?.name}</Text>
                            <View className="flex-row gap-x-md">
                                {detail?.points.map((point, index) => {
                                    const detail = point.details[0]
                                    const color = getAptitudeColor(detail.color)
                                    return (
                                        <MemoPill
                                            key={index + "_" + detail.type}
                                            name={detail.type}
                                            borderColor={color?.color}
                                            backgroundColor={color?.light}
                                            textColor={color?.color}
                                        />
                                    )
                                })}

                            </View>
                        </View>
                        {isOwner &&
                            <View className="flex-col justify-between">
                                <TouchableOpacity className="flex-row bg-primary-2 justify-center items-center rounded-xsm px-md gap-x-sm" onPress={handleCreateQRCode}>
                                    <QrCode size={24} color={Color["system-white"]} />
                                    <Text className="font-kanit-medium text-body text-system-white">QR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="flex-row bg-secondary-3 justify-center items-center rounded-xsm px-md gap-x-sm" onPress={handleEdit}>
                                    <PencilSimple size={16} color={Color["system-white"]} weight="bold" />
                                    <Text className="font-kanit-medium text-body text-system-white">แก้ไข</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                    <MemoSeperator />
                    <View className="flex p-[1.5rem] gap-y-lg">
                        <MemoContentIconBox
                            title={"รางวัล"}
                            detail={"Test Reward"}
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
                            detail={detail?.sections.organizer}
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
                            <Text className="font-kanit-regular text-body text-body-1">{detail?.description}</Text>
                        </View>
                    </View>
                </ScrollableView>
            </MemoCard>
        </BrandingBackground >
    )
}