import BrandingBackground from "@/components/background/branding-background"
import MemoSearchBar from "@/components/bar/memo-searchbar"
import MemoSelectionButton from "@/components/button/memo-selection-button"
import MemoCard from "@/components/container/memo-card"
import { MemoCase, MemoSwitch } from "@/components/logic/memo-switch"
import MemoAchievementList from "@/components/ui/kits/achievement/memo-achievement-list"
import { MemoSection } from "@/components/ui/kits/container/memo-content"
import MemoContentSkeleton from "@/components/ui/kits/skeleton/memo-content-skeleton"
import { FilterMode, useStudentAchievementFilters } from "@/hooks/achievement/useAchievementFilters"
import { useStudentAchievementsQuery } from "@/hooks/achievement/useAchievementQuery"
import { useStudentToken } from "@/hooks/useUserToken"
import { CalendarDots, GraduationCap, Medal } from "phosphor-react-native"
import { useEffect, useMemo, useState } from "react"
import { Text, View } from "react-native"

const ACHIEVEMENT_SECTIONS: MemoSection[] = [
  { id: "reward", name: "รางวัล", icon: Medal, secondary: true },
  { id: "date", name: "วันที่ปิดรับ", icon: CalendarDots, secondary: false },
  { id: "organizer", name: "คุณครูผู้ดูแล", icon: GraduationCap, secondary: false }
]

const ACHIEVEMENT_FILTERS = {
  ALL: { name: "ทั้งหมด" },
  OPEN: { name: "กำลังเปิดรับ" },
  DOING: { name: "เป้าหมายของฉัน" }
}

export default function StudentHomeScreen() {
  const [mode, setMode] = useState<FilterMode>("open")
  const { data: student } = useStudentToken()
  const {
    data: rawAchievements,
    refetch: refetchAll,
    isLoading: isLoadingAll,
    isError: isErrorAll
  } = useStudentAchievementsQuery()
  const {
    data: rawAchievementsDoing,
    refetch: refetchDoing,
    isLoading: isLoadingDoing,
    isError: isErrorDoing
  } = useStudentAchievementsQuery({ studentId: student?.sub })
  const isLoading = mode === "doing" ? isLoadingDoing : isLoadingAll
  const isError = mode === "doing" ? isErrorDoing : isErrorAll

  const doingAchievements = useMemo(
    () => rawAchievementsDoing?.data?.achievementStudent ?? [], [rawAchievementsDoing]
  )
  const achievements = useMemo(
    () => rawAchievements?.data?.achievementStudent ?? [], [rawAchievements]
  )
  useEffect(() => {
    console.log(JSON.stringify(rawAchievements?.data?.achievementStudent))
  }, [rawAchievements])

  const {
    filteredAchievements,
    setSearchQuery
  } = useStudentAchievementFilters(
    mode === "doing" ? doingAchievements : achievements, mode
  )

  const filterButtons = [
    {
      name: ACHIEVEMENT_FILTERS.ALL.name,
      active: mode === "all",
      onPress: () => setMode("all")
    },
    {
      name: ACHIEVEMENT_FILTERS.OPEN.name,
      active: mode === "open",
      onPress: () => setMode("open")
    },
    {
      name: ACHIEVEMENT_FILTERS.DOING.name,
      active: mode === "doing",
      onPress: () => setMode("doing")
    }
  ]
  const handleSearch = (text: string) => setSearchQuery(text)
  const handleRefresh = async () => {
    if (mode === "doing") refetchDoing()
    else refetchAll()
  }

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
