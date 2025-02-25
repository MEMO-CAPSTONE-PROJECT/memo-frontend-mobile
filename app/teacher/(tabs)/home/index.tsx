import BrandingBackground from "@/components/background/branding-background"
import MemoSearchBar from "@/components/bar/memo-searchbar"
import MemoIconButton from "@/components/button/memo-icon-button"
import MemoSelectionButton from "@/components/button/memo-selection-button"
import MemoIconBox from "@/components/container/box/memo-icon-box"
import MemoCard from "@/components/container/memo-card"
import { MemoCase, MemoSwitch } from "@/components/logic/memo-switch"
import MemoAchievementList from "@/components/ui/kits/achievement/memo-achievement-list"
import { MemoSection } from "@/components/ui/kits/container/memo-content"
import MemoContentSkeleton from "@/components/ui/kits/skeleton/memo-content-skeleton"
import { useTeacherAchievementFilters } from "@/hooks/achievement/useAchievementFilters"
import { useTeacherAchievementsQuery } from "@/hooks/achievement/useAchievementQuery"
import { useTeacherToken } from "@/hooks/useUserToken"
import { router } from "expo-router"
import { CalendarDots, GraduationCap, Medal, NotePencil, Plus, QrCode } from "phosphor-react-native"
import { useMemo } from "react"
import { Text, TouchableOpacity, View } from "react-native"

const ACHIEVEMENT_SECTIONS: MemoSection[] = [
    { id: "reward", name: "รางวัล", icon: Medal, secondary: true },
    { id: "date", name: "วันที่ปิดรับ", icon: CalendarDots, secondary: false },
    { id: "organizer", name: "คุณครูผู้ดูแล", icon: GraduationCap, secondary: false }
]

const ACHIEVEMENT_FILTERS = {
    ALL: { name: "ทั้งหมด" },
    OWNER: { name: "เป้าหมายที่ฉันสร้าง" }
}

interface TeacherOwnerActionsProps {
    isOwner: boolean
    onQRCode: () => void
    onEdit: () => void
}

function renderTeacherOwnerActions({ isOwner, onQRCode, onEdit }: Readonly<TeacherOwnerActionsProps>) {
    if (!isOwner) return null

    return (
        <View className="flex-row gap-md">
            <TouchableOpacity onPress={onQRCode}>
                <MemoIconBox variant="darkPrimary" size="medium" icon={QrCode} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onEdit}>
                <MemoIconBox variant="darkRed" size="medium" icon={NotePencil} />
            </TouchableOpacity>
        </View>
    )
}


export default function TeacherHomeScreen() {
    const { data, refetch, isLoading, isError } = useTeacherAchievementsQuery()
    const { data: teacher } = useTeacherToken()
    const teacherId = teacher?.sub ?? ""
    const achievements = useMemo(() => data?.data?.achievementTeacher ?? [], [data])

    const {
        filteredAchievements,
        setSearchQuery,
        isOwner,
        setIsOwner
    } = useTeacherAchievementFilters(teacherId, achievements)

    const filterButtons = [
        { name: ACHIEVEMENT_FILTERS.ALL.name, active: !isOwner, onPress: () => setIsOwner(false) },
        { name: ACHIEVEMENT_FILTERS.OWNER.name, active: isOwner, onPress: () => setIsOwner(true) }
    ]

    const handleSearch = (text: string) => setSearchQuery(text)
    const handleCreate = () => router.push("/teacher/home/create")
    const handleRefresh = async () => refetch()
    const handleQRCode = (achievementId: string, name: string) => router.push({
        pathname: "/teacher/home/qr-code",
        params: { id: achievementId, name: name }
    })
    const handleEdit = (achievementId: string) => router.push({
        pathname: "/teacher/home/edit",
        params: { id: achievementId }
    })

    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" className="relative gap-y-xl !p-0">
                <View className="gap-y-xl px-[1.5rem]">
                    <MemoSearchBar placeholder="ค้นหา เช่น แข่งเพชรยอ..." onSearch={handleSearch} />
                    <MemoSelectionButton buttons={filterButtons}>
                        <MemoIconButton icon={Plus} onPress={handleCreate} />
                    </MemoSelectionButton>
                </View>
                <MemoContentSkeleton isLoading={isLoading || isError}>
                    <MemoSwitch test={filteredAchievements.length}>
                        <MemoCase value={(test: number) => (test > 0)}>
                            <MemoAchievementList
                                sections={ACHIEVEMENT_SECTIONS}
                                achievements={filteredAchievements}
                                onRefresh={handleRefresh}
                                href={(id, name) => ({
                                    pathname: "/teacher/home/detail",
                                    params: { id, name }
                                })}
                                secondaryView={
                                    (achievement) => renderTeacherOwnerActions({
                                        isOwner: teacherId === achievement.teacherId,
                                        onQRCode: () => handleQRCode(achievement.id, achievement.name),
                                        onEdit: () => handleEdit(achievement.id)
                                    })
                                }
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
