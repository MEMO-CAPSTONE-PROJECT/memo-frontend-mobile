import BrandingBackground from "@/components/background/branding-background"
import MemoDonutChart from "@/components/chart/memo-donut-chart"
import MemoCard from "@/components/container/memo-card"
import ScrollableView from "@/components/scrollable/scrollable-view"
import MemoAptitudeRank from "@/components/ui/kits/aptitude/memo-aptitude-rank"
import MemoAptitudeInfoDialog from "@/components/ui/kits/dialog/memo-aptitude-info-dialog"
import { useStudentByIdQuery } from "@/hooks/query/useUserQuery"
import { useRankCriteria } from "@/hooks/useRankCriteria"
import { getAptitudeColor } from "@/shared/utils/aptitude-util"
import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

export default function StudentAptitudeOverallScreen() {
    const { studentId } = useLocalSearchParams()
    const { 
        data: rawStudent, 
        refetch: refetchStudentById, 
        isLoading, isError
    } = useStudentByIdQuery(studentId as string)
    const { 
        RankCriteria, 
        totalPoints, 
        points, 
        colors, 
        data: studentPointsData 
    } = useRankCriteria(rawStudent?.data?.student?.points, !isLoading && !isError)
    
    const handleRefresh = async () => refetchStudentById()

    return (
        <BrandingBackground>
            <MemoCard size="full" className="gap-y-lg !p-0 items-center">
                <View className="flex-row items-center gap-x-sm">
                    <Text className="font-kanit-bold text-title">ความสามารถที่โดดเด่นในแต่ละด้าน</Text>
                    <MemoAptitudeInfoDialog criteria={RankCriteria}/>
                </View>
                <MemoDonutChart 
                    point={totalPoints}
                    series={points} 
                    colors={colors} 
                />
                <ScrollableView border={false} className="gap-y-xl p-[1.5rem]" onRefresh={handleRefresh}>
                    {studentPointsData.map(({ type, color, point }, index) => {
                        const { icon, color: colorCode } = getAptitudeColor(color) ?? {}
                        return (<MemoAptitudeRank 
                            criteria={RankCriteria}
                            type={type} 
                            point={point} 
                            totalPoint={totalPoints}
                            icon={{ Icon: icon, color: colorCode, text: colorCode }} 
                            key={index + type} 
                        />)
                    })}
                </ScrollableView>
            </MemoCard>
        </BrandingBackground>
    )
}