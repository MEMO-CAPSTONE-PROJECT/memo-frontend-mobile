import BrandingBackground from "@/components/background/branding-background"
import MemoSearchBar from "@/components/bar/memo-searchbar"
import MemoSelectionButton from "@/components/button/memo-selection-button"
import MemoCard from "@/components/container/memo-card"
import ScrollableView from "@/components/scrollable/scrollable-view"
import MemoContentCard, { MemoSection } from "@/components/ui/kits/container/memo-content"
import { useStudentAchievements } from "@/hooks/useAchievement"
import { formattedPointColor, formattedReward } from "@/shared/utils/aptitude-util"
import { formattedDate } from "@/shared/utils/date-util"
import { CalendarDots, GraduationCap, Medal } from "phosphor-react-native"
import { useMemo, useState } from "react"
import { View } from "react-native"

export default function StudentHomeScreen() {
  const [isOpen, setIsOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { data, refetch } = useStudentAchievements()
  const achievements = useMemo(() => data?.data?.achievementStudent ?? [], [data])

  const buttons = [
    { name: "เป้าหมายที่เปิดรับ", active: isOpen, onPress: () => setIsOpen(true) },
    { name: "เป้าหมายที่ปิดรับ", active: !isOpen, onPress: () => setIsOpen(false) }
  ]
  const sections: MemoSection[] = [
    { id: "reward", name: "รางวัล", icon: Medal, secondary: true },
    { id: "date", name: "วันที่ปิดรับ", icon: CalendarDots, secondary: false },
    { id: "organizer", name: "คุณครูผู้ดูแล", icon: GraduationCap, secondary: false }
  ]
  const filteredAchievements = useMemo(
    () => {
      return achievements.filter(
        (achievement) =>
          achievement.name.includes(searchQuery) &&
          // (achievement.open === isOpen)
          (Math.random() < 0.5 === isOpen)
      )
    }, [achievements, isOpen, searchQuery])

  function handleSearch(text: string) {
      setSearchQuery(text)
  }
  async function handleRefresh() {
    refetch()
  }
  
  return (
    <BrandingBackground variant="secondary">
      <MemoCard size="full" className="gap-y-xl !p-0">
        <View className="gap-y-xl px-[1.5rem]">
          <MemoSearchBar placeholder="ค้นหา เช่น แข่งเพชรยอ..." onSearch={handleSearch} />
          <MemoSelectionButton buttons={buttons} />
        </View>
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
                  pathname: "/student/home/detail", 
                  params: { id: content.id, name: content.name } 
              }}
            />
          ))}
        </ScrollableView>
      </MemoCard>
    </BrandingBackground>
  )
}