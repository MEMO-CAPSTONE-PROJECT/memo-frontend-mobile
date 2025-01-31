import BrandingBackground from "@/components/background/branding-background"
import MemoDonutChart from "@/components/chart/memo-donut-chart"
import MemoCard from "@/components/container/memo-card"
import ScrollableView from "@/components/scrollable/scrollable-view"
import AptitudeTierDiamondSvg from "@/components/ui/icons/aptitude-tier/diamond-svg"
import AptitudeTierEmeraldSvg from "@/components/ui/icons/aptitude-tier/emerald-svg"
import AptitudeTierGoldSvg from "@/components/ui/icons/aptitude-tier/gold-svg"
import AptitudeTierSilverSvg from "@/components/ui/icons/aptitude-tier/silver-svg"
import AptitudeTierWoodSvg from "@/components/ui/icons/aptitude-tier/wood-svg"
import MemoAptitudeRank from "@/components/ui/kits/aptitude/memo-aptitude-rank"
import MemoAptitudeInfoDialog from "@/components/ui/kits/dialog/memo-aptitude-info-dialog"
import { AptitudeType } from "@/constants/aptitude-type"
import { Color } from "@/constants/theme/color"
import { useStudentByIdQuery } from "@/hooks/query/useUserQuery"
import { useStudentToken } from "@/hooks/useUserToken"
import { getAptitudeColor } from "@/shared/utils/aptitude-util"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"

const TIER_ICON_SIZE = 70
const RANK_CRITERIA = [
    {
        name: "เชี่ยวชาญ",
        percent: 30,
        icon: <AptitudeTierEmeraldSvg size={TIER_ICON_SIZE} />,
    },
    {
        name: "เหนือชั้น",
        percent: 20,
        icon: <AptitudeTierDiamondSvg size={TIER_ICON_SIZE} />,
    },
    {
        name: "เก่ง",
        percent: 10,
        icon: <AptitudeTierGoldSvg size={TIER_ICON_SIZE} />,
    },
    {
        name: "ขยัน",
        percent: 5,
        icon: <AptitudeTierSilverSvg size={TIER_ICON_SIZE} />,
    },
    {
        name: "ธรรมดา",
        percent: 0,
        icon: <AptitudeTierWoodSvg size={TIER_ICON_SIZE} />,
    },
]

export default function StudentAptitudeOverallScreen() {
    const { data: student } = useStudentToken()
    const [totalPoints, setTotalPoints] = useState(0)
    const [points, setPoints] = useState<number[]>([])
    const [colors, setColors] = useState<string[]>([])
    const { data: rawStudent, refetch: refetchStudentById } = useStudentByIdQuery(student?.sub ?? "")

    const studentPointsData = rawStudent?.data?.student?.points
    const studentPoints = studentPointsData ?? Object.keys(AptitudeType).map((aptitude) => (
        {
            type: aptitude,
            color: AptitudeType[aptitude],
            point: 0
        }
    ))

    // Calculate total points when data is available
    useEffect(() => {
        if (studentPointsData) {
            const updatedPoints = []
            const updatedColors = []
            let updatedTotalPoints = 0
    
            for (const { point, color } of studentPointsData) {
                const aptitude = getAptitudeColor(color)
                updatedPoints.push(point)
                updatedColors.push(aptitude?.color ?? Color["primary-2"])
                updatedTotalPoints += point
            }
    
            setPoints(updatedPoints)
            setColors(updatedColors)
            setTotalPoints(updatedTotalPoints)
        } else {
            // Reset states if data is not available
            setPoints([])
            setColors([])
            setTotalPoints(0)
        }
    }, [studentPointsData])
    
    const handleRefresh = async () => refetchStudentById()

    return (
        <BrandingBackground>
            <MemoCard size="full" className="gap-y-lg !p-0 items-center">
                <View className="flex-row items-center gap-x-sm">
                    <Text className="font-kanit-bold text-title">ความสามารถที่โดดเด่นในแต่ละด้าน</Text>
                    <MemoAptitudeInfoDialog criteria={RANK_CRITERIA}/>
                </View>
                <MemoDonutChart 
                    point={totalPoints}
                    series={points} 
                    colors={colors} 
                />
                <ScrollableView border={false} className="gap-y-xl p-[1.5rem]" onRefresh={handleRefresh}>
                    {studentPoints.map(({ type, color, point }, index) => {
                        const { icon, color: colorCode } = getAptitudeColor(color) ?? {}
                        return (<MemoAptitudeRank 
                            criteria={RANK_CRITERIA}
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