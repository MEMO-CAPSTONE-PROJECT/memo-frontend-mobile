import { mockTeacherContents } from "@/app/teacher/(tabs)/home/contents.mock";
import BrandingBackground from "@/components/background/branding-background";
import MemoSearchBar from "@/components/bar/memo-searchbar";
import MemoSelectionButton from "@/components/button/memo-selection-button";
import MemoCard from "@/components/container/memo-card";
import ScrollableView from "@/components/scrollable/scrollable-view";
import MemoContentCard, { MemoSection } from "@/components/ui/kits/container/memo-content";
import { CalendarDots, GraduationCap, Medal } from "phosphor-react-native";
import { useState } from "react";
import { View } from "react-native";

export default function TeacherHomeScreen() {
    const [isOpen, setIsOpen] = useState(true)
    const buttons = [
      { name: "เป้าหมายที่เปิดรับ", active: isOpen, onPress: () => setIsOpen(true) },
      { name: "เป้าหมายที่ปิดรับ", active: !isOpen, onPress: () => setIsOpen(false) }
    ]
    const sections: MemoSection[] = [
      { id: "reward", name: "รางวัล", icon: Medal, secondary: true },
      { id: "date", name: "วันที่ปิดรับ", icon: CalendarDots, secondary: false },
      { id: "organizer", name: "คุณครูผู้ดูแล", icon: GraduationCap, secondary: false }
    ]
    const contents = mockTeacherContents
    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" className="gap-y-xl !p-0">
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
                                pathname: "/student/home/[detail]",
                                params: { detail: content.id, name: content.name }
                            }}
                        />
                    ))}
                </ScrollableView>
            </MemoCard>
        </BrandingBackground>
    )
}