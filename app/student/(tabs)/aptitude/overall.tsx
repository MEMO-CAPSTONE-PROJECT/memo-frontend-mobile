import BrandingBackground from "@/components/background/branding-background"
import MemoCard from "@/components/container/memo-card"
import ScrollableView from "@/components/scrollable/scrollable-view"
import { AptitudeColor } from "@/constants/aptitude-color"
import { Color } from "@/constants/theme/color"
import { useStudentById } from "@/hooks/useUser"
import { useStudentToken } from "@/hooks/useUserToken"
import { Icon } from "phosphor-react-native"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"

interface ProgressBarProps {
    progress: number
}

function ProgressBar({ progress }: Readonly<ProgressBarProps>) {
    return (
        <View className="w-full">
            <View className="w-full h-md rounded-sm bg-system-light-gray" />
            <View
                className="absolute h-md rounded-sm bg-secondary-2"
                style={{ width: `${progress * 100}%` }}
            />
        </View>
    )
}

interface SummaryCircleProps {
    totalPoints: number
    pointsToNextLevel: number
}

function SummaryCircle({ totalPoints, pointsToNextLevel }: Readonly<SummaryCircleProps>) {
    return (
        <View className="w-full px-[1.5rem] items-center gap-y-md">
            <Text className="font-kanit-bold text-title">ความสามารถที่โดดเด่นในแต่ละด้าน</Text>
            <View className="w-60 h-60 border-[25px] border-primary-3 rounded-circle items-center justify-center">
                <View className="w-40 h-40 items-center justify-center rounded-circle bg-system-light-purple">
                    <Text className="font-kanit-bold text-header text-title-1">{totalPoints}</Text>
                    <Text className="font-kanit-bold text-caption-2 text-primary-3">คะแนนรวมทั้งหมด</Text>
                </View>
            </View>
            { /* ProgressBar */}
            <Text className="font-kanit-medium text-caption-1">อีก <Text className="font-kanit-bold text-secondary-2">{pointsToNextLevel}</Text> คะแนน ถึงจะไปเลเวลถัดไป</Text>
            <ProgressBar progress={0.5} />
        </View>
    )
}

interface AptitudeItemProps {
    type: string
    point: number
    icon?: {
        Icon?: Icon
        color?: string
        text?: string
    }
}

function AptitudeItem({
    type,
    point,
    icon,
}: Readonly<AptitudeItemProps>) {
    return (
        <View className="w-full bg-system-lightest-gray flex-row items-center justify-between p-md rounded-sm">
            <View className="flex-row gap-x-lg">
                <View 
                    className={`w-12 h-12 rounded-sm items-center justify-center`}
                    style={{ backgroundColor: icon?.color ?? "" }}
                >
                    {icon?.Icon && <icon.Icon color={Color["system-white"]} weight="fill" size={26} />}
                </View>
                <View>
                    <Text 
                        className={`font-kanit-medium`}
                        style={{ color: icon?.text ?? "" }}
                    >
                        {type}
                    </Text>
                    <Text className="font-kanit-regular">({point} คะแนน)</Text>
                </View>
            </View>
            <Text className="font-kanit-bold text-body">ยอดเยี่ยมมาก</Text>
        </View>
    )
}

export default function StudentAptitudeOverallScreen() {
    const { data: student } = useStudentToken()
    const [totalPoints, setTotalPoints] = useState(0)
    const { data } = useStudentById(student?.sub ?? "")

    // Calculate total points when data is available
    useEffect(() => {
        if (data?.data?.student?.points) {
            const points = data.data.student.points.reduce((acc: number, { point }) => acc + point, 0)
            setTotalPoints(points)
        }
    }, [data])
    const aptitudes = data?.data?.student?.points?.map(
        ({ type, color, point }, index) => {
            const { icon, color: colorCode } = color in AptitudeColor ? AptitudeColor[color] : {}
            return <AptitudeItem type={type} point={point} icon={{ Icon: icon, color: colorCode, text: colorCode }} key={index + type} />
    }) ?? []
    const pointsToNextLevel = 1327

    return (
        <BrandingBackground>
            <MemoCard size="full" className="gap-y-lg !p-0">
                <SummaryCircle totalPoints={totalPoints} pointsToNextLevel={pointsToNextLevel} />
                <ScrollableView border={false} className="gap-y-lg px-[1.5rem]">
                    {aptitudes}
                </ScrollableView>
            </MemoCard>
        </BrandingBackground>
    )
}