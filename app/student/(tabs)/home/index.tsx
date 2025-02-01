import BrandingBackground from "@/components/background/branding-background"
import MemoSearchBar from "@/components/bar/memo-searchbar"
import MemoSelectionButton from "@/components/button/memo-selection-button"
import MemoCard from "@/components/container/memo-card"
import { MemoCase, MemoSwitch } from "@/components/logic/memo-switch"
import MemoAchievementList from "@/components/ui/kits/achievement/memo-achievement-list"
import { MemoSection } from "@/components/ui/kits/container/memo-content"
import MemoContentSkeleton from "@/components/ui/kits/skeleton/memo-content-skeleton"
import { useStudentAchievementFilters } from "@/hooks/achievement/useAchievementFilters"
import { useStudentAchievementsQuery } from "@/hooks/achievement/useAchievementQuery"
import { CalendarDots, GraduationCap, Medal } from "phosphor-react-native"
import { useMemo } from "react"
import { Text, View } from "react-native"

const ACHIEVEMENT_SECTIONS: MemoSection[] = [
  { id: "reward", name: "รางวัล", icon: Medal, secondary: true },
  { id: "date", name: "วันที่ปิดรับ", icon: CalendarDots, secondary: false },
  { id: "organizer", name: "คุณครูผู้ดูแล", icon: GraduationCap, secondary: false }
]

const ACHIEVEMENT_FILTERS = {
  OPEN: { name: "เป้าหมายที่เปิดรับ" },
  CLOSED: { name: "เป้าหมายที่ปิดรับ" }
}

export default function StudentHomeScreen() {
  const { data, refetch, isLoading, isError } = useStudentAchievementsQuery()
  const achievements = useMemo(() => data?.data?.achievementStudent ?? [], [data])
  
  const { 
    filteredAchievements, 
    isOpen, 
    setIsOpen, 
    setSearchQuery 
  } = useStudentAchievementFilters(achievements)

  const filterButtons = [
    {
      name: ACHIEVEMENT_FILTERS.OPEN.name,
      active: isOpen,
      onPress: () => setIsOpen(true)
    },
    {
      name: ACHIEVEMENT_FILTERS.CLOSED.name,
      active: !isOpen,
      onPress: () => setIsOpen(false)
    }
  ]

  const handleSearch = (text: string) => setSearchQuery(text)
  const handleRefresh = async () => refetch()

  return (
    <BrandingBackground variant="secondary">
      <MemoCard size="full" className="relative gap-y-xl !p-0">
        <View className="gap-y-xl px-[1.5rem]">
          <MemoSearchBar placeholder="ค้นหา เช่น แข่งเพชรยอ..." onSearch={handleSearch} />
          <MemoSelectionButton buttons={filterButtons} />
        </View>
        <MemoContentSkeleton isLoading={isLoading || isError}>
          <MemoSwitch test={filteredAchievements.length}>
            <MemoCase value={(test: number) => test > 0}>
              <MemoAchievementList 
                sections={ACHIEVEMENT_SECTIONS} 
                achievements={filteredAchievements} 
                onRefresh={handleRefresh} 
                href={(id, name) => ({
                  pathname: "/student/home/detail",
                  params: { id, name }
                })} 
              />
            </MemoCase>
            <MemoCase default>
              <View className="flex-1 items-center justify-center">
                <Text className="font-kanit-medium text-body text-title-1">ไม่พบเป้าหมายที่ต้องการ</Text>
              </View>
            </MemoCase>
          </MemoSwitch>
        </MemoContentSkeleton>
      </MemoCard>
    </BrandingBackground>
  )
}