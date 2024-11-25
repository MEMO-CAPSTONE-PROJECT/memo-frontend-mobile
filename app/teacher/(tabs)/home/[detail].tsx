import { ImageAssets } from "@/assets/images/image-assets";
import BrandingBackground from "@/components/background/branding-background";
import MemoContentIconBox from "@/components/container/box/memo-content-icon-box";
import MemoCard from "@/components/container/memo-card";
import MemoPill from "@/components/pill/memo-pill";
import ScrollableView from "@/components/scrollable/scrollable-view";
import MemoSeperator from "@/components/seperator/memo-seperator";
import { useLocalSearchParams } from "expo-router";
import { CalendarDots, GraduationCap, Medal, Users } from "phosphor-react-native";
import { Image, Text, View } from "react-native";

export default function TeacherDetailScreen() {
    const { name } = useLocalSearchParams()
    const detail = "รับตัวแทน แข่งวิทย์ 3 คน  แข่ง ณ โรงยิมของโรงเรียน\nสิ่งของที่ต้องเตรียม\n - ผ้ากันเปื้อน\n - ยาสีฟัน\n - หมอนข้าง\n - ช้างน้อย\n - พิณอิอิ"
    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" className="!p-0 !pt-0 !rounded-t-none">
                <ScrollableView border={false}>
                    <Image source={ImageAssets.diamond} className="w-full h-[200] object-fill" />
                    <View className="flex-col p-[1.5rem] gap-y-sm">
                        <Text className="font-kanit-bold text-title text-title-1">{name}</Text>
                        <View className="flex-row gap-x-md">
                            <MemoPill name="จิตอาสา" />
                            <MemoPill name="กล้าแสดงออก" variant="secondary" />
                        </View>
                    </View>
                    <MemoSeperator />
                    <View className="flex p-[1.5rem] gap-y-lg">
                        <MemoContentIconBox
                            title={"รางวัล"}
                            detail={"จิตอาสา 5 หรือ 10 แต้ม, กล้าแสดงออก 3 หรือ 7 แต้ม"}
                            icon={Medal}
                            variant={"secondary"}
                        />
                        <MemoContentIconBox
                            title={"วันที่ปิดรับ"}
                            detail={"จิตอาสา 5 หรือ 10 แต้ม, กล้าแสดงออก 3 หรือ 7 แต้ม"}
                            icon={CalendarDots}
                            variant={"primary"}
                        />
                        <MemoContentIconBox
                            title={"คุณครูผู้ดูแล"}
                            detail={"จิตอาสา 5 หรือ 10 แต้ม, กล้าแสดงออก 3 หรือ 7 แต้ม"}
                            icon={GraduationCap}
                            variant={"primary"}
                        />
                        <MemoContentIconBox
                            title={"จำนวนผู้สมัคร"}
                            detail={"จิตอาสา 5 หรือ 10 แต้ม, กล้าแสดงออก 3 หรือ 7 แต้ม"}
                            icon={Users}
                            variant={"primary"}
                        />
                        <View className="gap-y-sm">
                            <Text className="font-kanit-bold text-title text-title-1">รายละเอียด</Text>
                            <Text className="font-kanit-regular text-body text-body-1">{detail}</Text>
                        </View>
                    </View>
                </ScrollableView>
            </MemoCard>
        </BrandingBackground>
    )
}