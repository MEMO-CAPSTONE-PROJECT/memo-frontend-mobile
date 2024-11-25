import { mockTeacherContents } from "@/app/teacher/(tabs)/home/contents.mock";
import BrandingBackground from "@/components/background/branding-background";
import MemoSearchBar from "@/components/bar/memo-searchbar";
import MemoSelectionButton from "@/components/button/memo-selection-button";
import MemoCard from "@/components/container/memo-card";
import ScrollableView from "@/components/scrollable/scrollable-view";
import MemoContentCard, { MemoSection } from "@/components/ui/kits/container/memo-content";
import { Color } from "@/constants/theme/color";
import { Link } from "expo-router";
import { CalendarDots, GraduationCap, Medal, Plus } from "phosphor-react-native";
import { useState } from "react";
import { View } from "react-native";

export default function TeacherHomeScreen() {
    const [isOpen, setIsOpen] = useState(true)
    const buttons = [
      { name: "เป้าหมายทั้งหมด", active: isOpen, onPress: () => setIsOpen(true) },
      { name: "เป้าหมายของฉัน", active: !isOpen, onPress: () => setIsOpen(false) }
    ]
    const sections: MemoSection[] = [
      { id: "reward", name: "รางวัล", icon: Medal, secondary: true },
      { id: "date", name: "วันที่ปิดรับ", icon: CalendarDots, secondary: false },
      { id: "organizer", name: "คุณครูผู้ดูแล", icon: GraduationCap, secondary: false }
    ]
    const contents = mockTeacherContents
    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" className="relative gap-y-xl !p-0">
                <View className="gap-y-xl px-[1.5rem]">
                    <MemoSearchBar placeholder="ค้นหา" />
                    <MemoSelectionButton buttons={buttons} />
                </View>
                <ScrollableView border={false} gap={false} className="gap-y-xl">
                    {contents.filter(content => content.open === isOpen).map((content, index, contents) => (
                        <MemoContentCard
                            divider={index !== contents.length - 1}
                            key={`${index}_${content.name}`}
                            content={content}
                            sections={sections}
                            href={{
                                pathname: "/teacher/home/[detail]",
                                params: { detail: content.id, name: content.name }
                            }}
                        />
                    ))}
                </ScrollableView>
                <Link href="/teacher/home/create" className="absolute bottom-6 right-6">
                    <View className="w-14 h-14 rounded-circle bg-primary-3 justify-center items-center">
                        <Plus color={Color["system-white"]} weight="bold" size={32} />
                    </View>
                </Link>
            </MemoCard>
        </BrandingBackground>
    )
}