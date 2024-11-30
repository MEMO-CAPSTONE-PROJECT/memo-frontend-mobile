import BrandingBackground from "@/components/background/branding-background";
import MemoSearchBar from "@/components/bar/memo-searchbar";
import MemoIconButton from "@/components/button/memo-icon-button";
import MemoSelectionButton from "@/components/button/memo-selection-button";
import MemoCard from "@/components/container/memo-card";
import ScrollableView from "@/components/scrollable/scrollable-view";
import MemoContentCard, { MemoSection } from "@/components/ui/kits/container/memo-content";
import { AptitudeColor } from "@/constants/aptitude-color";
import { Achievement, useTeacherAchievements } from "@/hooks/useAchievement";
import { useTeacherToken } from "@/hooks/useUserToken";
import { router } from "expo-router";
import { CalendarDots, GraduationCap, Medal, Plus } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function TeacherHomeScreen() {
    const [isOwner, setIsOwner] = useState(true)
    const [contents, setContents] = useState<Achievement[]>([])
    const { data } = useTeacherAchievements()
    const { data: teacher} = useTeacherToken()
    const achievements = data?.data?.achievementTeacher
    useEffect(() => {
        if (achievements) 
            setContents(achievements ?? [])
    }, [achievements])
    
    const buttons = [
      { name: "เป้าหมายทั้งหมด", active: !isOwner, onPress: () => setIsOwner(false) },
      { name: "เป้าหมายของฉัน", active: isOwner, onPress: () => setIsOwner(true) }
    ]
    const sections: MemoSection[] = [
      { id: "reward", name: "รางวัล", icon: Medal, secondary: true },
      { id: "date", name: "วันที่ปิดรับ", icon: CalendarDots, secondary: false },
      { id: "organizer", name: "คุณครูผู้ดูแล", icon: GraduationCap, secondary: false }
    ]

    function handleSearch(text: string) {
        setContents(achievements?.filter(achievement => achievement.name.includes(text)) ?? [])
    }
    function handleCreate() {
        router.push("/teacher/home/create")
    }

    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" className="relative gap-y-xl !p-0">
                <View className="gap-y-xl px-[1.5rem]">
                    <MemoSearchBar placeholder="ค้นหา เช่น แข่งเพชรยอ..." onSearch={handleSearch} />
                    <MemoSelectionButton buttons={buttons} />
                </View>
                <ScrollableView border={false} gap={false} className="gap-y-xl">
                    {contents.filter(content => !isOwner || (isOwner && content.teacherId === teacher?.sub)).map((content, index, contents) => (
                        <MemoContentCard
                            divider={index !== contents.length - 1}
                            key={`${index}_${content.name}`}
                            content={{
                                id: content.id,
                                name: content.name,
                                open: false,
                                // src: content.src,
                                sections: {
                                    reward: "รางวัล",
                                    date: content.sections.startDate + "-" + content.sections.endDate,
                                    organizer: content.sections.organizer
                                },
                                tags: content.points.map((point) => {
                                    const detail = point.details[0]
                                    const color = detail.color in AptitudeColor ? AptitudeColor[detail.color] : undefined
                                    return {
                                        id: detail.type,
                                        borderColor: color?.color,
                                        backgroundColor: color?.light,
                                        textColor: color?.color
                                    }
                                })
                            }}
                            sections={sections}
                            href={{
                                pathname: "/teacher/home/detail",
                                params: { id: content.id, name: content.name }
                            }}
                        />
                    ))}
                </ScrollableView>
                <MemoIconButton icon={Plus} className="absolute bottom-4 right-4" onPress={handleCreate} />
            </MemoCard>
        </BrandingBackground>
    )
}