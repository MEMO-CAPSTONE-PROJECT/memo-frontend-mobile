import { mockTeacherDetails } from "@/app/teacher/(tabs)/home/mock/details.mock";
import { mockUser } from "@/app/teacher/(tabs)/home/mock/user.mock";
import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoContentIconBox from "@/components/container/box/memo-content-icon-box";
import MemoCard from "@/components/container/memo-card";
import MemoPill from "@/components/pill/memo-pill";
import ScrollableView from "@/components/scrollable/scrollable-view";
import MemoSeperator from "@/components/seperator/memo-seperator";
import { Color } from "@/constants/theme/color";
import { router, useLocalSearchParams } from "expo-router";
import { CalendarDots, GraduationCap, Medal, PencilSimple, Users } from "phosphor-react-native";
import { Image, Pressable, Text, View } from "react-native";

export default function TeacherDetailScreen() {
    const { id } = useLocalSearchParams()
    if (!id) return <></>
    const detail = mockTeacherDetails.find(item => item.id === id)
    const user = mockUser
    if (!detail) {
        router.back()
        return <></>
    }

    function getTagVariant(variant: string) {
        if (variant === "secondary") {
            return "secondary"
        } else {
            return "primary"
        }
    }
    function handleEdit() {
        router.push("/teacher/home/edit")
    }
    function handleCreateQRCode() {
        router.push("/teacher/home/qr-code")
    }

    const isOwner = user.id === detail.owner

    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" className="!p-0 !pt-0 !rounded-t-none">
                <ScrollableView border={false}>
                    <Image source={detail.src} className="w-full h-[200] object-fill" />
                    <View className="p-[1.5rem] flex-row justify-between">
                        <View className="flex-col gap-y-sm">
                            <Text className="font-kanit-bold text-title text-title-1">{detail.name}</Text>
                            <View className="flex-row gap-x-md">
                                {detail.tags.map((tag, index) => (
                                    <MemoPill
                                        key={index + "_" + tag.id}
                                        name={tag.id}
                                        variant={getTagVariant(tag.variant)}
                                    />
                                ))}
                            </View>
                        </View>
                        {isOwner &&
                            < Pressable className="flex-row bg-system-error-2 justify-center items-center rounded-sm px-md gap-x-sm" onPress={handleEdit}>
                                <PencilSimple size={20} color={Color["system-white"]} weight="fill" />
                                <Text className="font-kanit-medium text-body text-system-white">แก้ไข</Text>
                            </Pressable>
                        }
                    </View>
                    <MemoSeperator />
                    <View className="flex p-[1.5rem] gap-y-lg">
                        <MemoContentIconBox
                            title={"รางวัล"}
                            detail={detail.sections.reward}
                            icon={Medal}
                            variant={"secondary"}
                        />
                        <MemoContentIconBox
                            title={"วันที่ปิดรับ"}
                            detail={detail.sections.date}
                            icon={CalendarDots}
                            variant={"primary"}
                        />
                        <MemoContentIconBox
                            title={"คุณครูผู้ดูแล"}
                            detail={detail.sections.organizer}
                            icon={GraduationCap}
                            variant={"primary"}
                        />
                        <MemoContentIconBox
                            title={"จำนวนผู้สมัคร"}
                            detail={detail.sections.amount}
                            icon={Users}
                            variant={"primary"}
                        />
                        <View className="gap-y-sm">
                            <Text className="font-kanit-bold text-title text-title-1">รายละเอียด</Text>
                            <Text className="font-kanit-regular text-body text-body-1">{detail.description}</Text>
                        </View>
                    </View>
                    {isOwner && 
                        <View className="px-lg pb-lg">
                            <MemoButton name="สร้าง QR คะแนน" variant="primary" onPress={handleCreateQRCode} />
                        </View>
                    }
                </ScrollableView>
            </MemoCard>
        </BrandingBackground >
    )
}