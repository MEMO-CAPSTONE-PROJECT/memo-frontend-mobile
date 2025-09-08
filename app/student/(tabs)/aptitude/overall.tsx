import BrandingBackground from "@/components/background/branding-background"
import MemoDonutChart from "@/components/chart/memo-donut-chart"
import MemoCard from "@/components/container/memo-card"
import ScrollableView from "@/components/scrollable/scrollable-view"
import MemoAptitudeRank from "@/components/ui/kits/aptitude/memo-aptitude-rank"
import MemoAptitudeBottomSheet from "@/components/ui/kits/sheet/memo-aptitude-bottom-sheet"
import { useStudentByIdQuery } from "@/hooks/query/useUserQuery"
import { useRankCriteria } from "@/hooks/useRankCriteria"
import { useStudentToken } from "@/hooks/useUserToken"
import { getAptitudeColor } from "@/shared/utils/aptitude-util"
import { useMemo } from "react"
import { Text, View } from "react-native"

export default function StudentAptitudeOverallScreen() {
    const { data: student } = useStudentToken()
    const { 
        data: rawStudent, 
        refetch: refetchStudentById, 
        isLoading, 
        isError
    } = useStudentByIdQuery(student?.sub ?? "")

    const { 
        RankCriteria, 
        totalPoints, 
        points, 
        colors, 
        data: studentPointsData 
    } = useRankCriteria(rawStudent?.data?.student?.points, !isLoading && !isError)

    const rankedData = useMemo(() => studentPointsData.sort((a, b) => b.point - a.point).map(({ type, color, point }) => {
        const { icon, color: colorCode } = getAptitudeColor(color) ?? {}
        return { type, point, icon, colorCode }
    }), [studentPointsData])
    
    const handleRefresh = async () => refetchStudentById()

    return (
        <BrandingBackground>
            <MemoCard size="full" className="gap-y-lg !p-0 items-center">
                <View className="flex-row items-center gap-x-sm">
                    <Text className="font-kanit-bold text-title">ความสามารถที่โดดเด่นในแต่ละด้าน</Text>
                    <MemoAptitudeBottomSheet criteria={RankCriteria}/>
                </View>
                <MemoDonutChart 
                    point={totalPoints}
                    series={points} 
                    colors={colors} 
                />
                <ScrollableView border={false} className="gap-y-xl p-[1.5rem]" onRefresh={handleRefresh}>
                    {rankedData.map(({ type, point, icon, colorCode }, index) => (
                        <MemoAptitudeRank 
                            criteria={RankCriteria}
                            type={type} 
                            point={point} 
                            totalPoint={totalPoints}
                            icon={{ Icon: icon, color: colorCode, text: colorCode }} 
                            key={index + type} 
                        />
                    ))}
                </ScrollableView>
            </MemoCard>
        </BrandingBackground>
    )
}