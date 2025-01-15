import BrandingBackground from "@/components/background/branding-background"
import MemoSearchBar from "@/components/bar/memo-searchbar"
import MemoIconButton from "@/components/button/memo-icon-button"
import MemoSelectionButton from "@/components/button/memo-selection-button"
import MemoCard from "@/components/container/memo-card"
import ScrollableView from "@/components/scrollable/scrollable-view"
import MemoContentCard, { MemoSection } from "@/components/ui/kits/container/memo-content"
import { Color } from "@/constants/theme/color"
import { useTeacherAchievements } from "@/hooks/useAchievement"
import { useTeacherToken } from "@/hooks/useUserToken"
import { formattedPointColor, formattedReward } from "@/shared/utils/aptitude-util"
import { formattedDate } from "@/shared/utils/date-util"
import { router } from "expo-router"
import { CalendarDots, GraduationCap, Medal, Plus, Megaphone } from "phosphor-react-native"
import { useMemo, useState } from "react"
import { View, Text } from "react-native"

export default function TeacherHomeScreen() {
    const [isOwner, setIsOwner] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const { data, refetch } = useTeacherAchievements()
    const { data: teacher } = useTeacherToken()
    const achievements = useMemo(() => data?.data?.achievementTeacher ?? [], [data])

    const buttons = [
        { name: "เป้าหมายทั้งหมด", active: !isOwner, onPress: () => setIsOwner(false) },
        { name: "เป้าหมายที่ฉันสร้าง", active: isOwner, onPress: () => setIsOwner(true) }
    ]
    const sections: MemoSection[] = [
        { id: "reward", name: "รางวัล", icon: Medal, secondary: true },
        { id: "date", name: "วันที่ปิดรับ", icon: CalendarDots, secondary: false },
        { id: "organizer", name: "คุณครูผู้ดูแล", icon: GraduationCap, secondary: false }
    ]
    const filteredAchievements = useMemo(
        () => {
            const teacherId = teacher?.sub ?? ""
            return achievements.sort().filter(
                (achievement) =>
                    achievement.name.includes(searchQuery) &&
                    (!isOwner || (isOwner && achievement.teacherId === teacherId))
            )
        }, [achievements, isOwner, searchQuery, teacher?.sub])

    function handleSearch(text: string) {
        setSearchQuery(text)
    }

    function handleCreate() {
        router.push("/teacher/home/create")
    }
    async function handleRefresh() {
        refetch()
    }

    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" className="relative gap-y-xl !p-0">
                <View className="gap-y-xl px-[1.5rem]">
                    <MemoSearchBar placeholder="ค้นหา เช่น แข่งเพชรยอ..." onSearch={handleSearch} />
                    <MemoSelectionButton buttons={buttons} />
                </View>
                {filteredAchievements.length > 0 ?
                    <ScrollableView border={false} gap={false} className="gap-y-xl" onRefresh={handleRefresh}>
                        {filteredAchievements.map((content, index, contents) => (
                            <MemoContentCard
                                divider={index !== contents.length - 1}
                                key={`${index}_${content.name}`}
                                content={{
                                    id: content.id,
                                    name: content.name,
                                    // src: content.src,
                                    sections: {
                                        reward: formattedReward(content.points),
                                        date: formattedDate(content.sections.startDate, content.sections.endDate),
                                        organizer: content.sections.organizer
                                    },
                                    tags: formattedPointColor(content?.points)
                                }}
                                sections={sections}
                                href={{
                                    pathname: "/teacher/home/detail",
                                    params: { id: content.id, name: content.name }
                                }}
                                isOwner={teacher?.sub === content.teacherId}
                            />
                        ))}
                    </ScrollableView> :
                    <View className="flex-1 items-center justify-center gap-y-2">
                        <Text className="font-kanit-medium text-body text-title-1">ไม่มีพบเป้าหมายที่ต้องการ</Text>
                        <Megaphone size={64} weight="light" color={Color["title-1"]} />
                    </View>
                }
                <MemoIconButton icon={Plus} className="absolute bottom-4 right-4" onPress={handleCreate} />
            </MemoCard>
        </BrandingBackground>
    )
}