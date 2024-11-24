import BrandingBackground from "@/components/background/branding-background"
import MemoCard from "@/components/container/memo-card"
import ScrollableView from "@/components/scrollable/scrollable-view"
import { Color } from "@/constants/theme/color"
import { Clock, Crown, Heart, Icon, ListChecks, Star, Trophy } from "phosphor-react-native"
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
    icon: {
        Icon: Icon
        color: string
        text: string
    }
}

function AptitudeItem({
    type,
    point,
    icon: { Icon, color, text },
}: Readonly<AptitudeItemProps>) {
    return (
        <View className="w-full bg-system-lightest-gray flex-row items-center justify-between p-md rounded-sm">
            <View className="flex-row gap-x-lg">
                <View className={`w-12 h-12 rounded-sm items-center justify-center ${color}`}>
                    <Icon color={Color["system-white"]} weight="fill" size={26} />
                </View>
                <View>
                    <Text className={`font-kanit-medium ${text}`}>{type}</Text>
                    <Text className="font-kanit-regular">({point} คะแนน)</Text>
                </View>
            </View>
            <Text className="font-kanit-bold text-body">ยอดเยี่ยมมาก</Text>
        </View>
    )
}

export default function StudentAptitudeOverallScreen() {
    const totalPoints = 8012
    const pointsToNextLevel = 1327
    const aptitudes = [
        { type: "จิตอาสา", point: 4006, icon: { Icon: Heart, color: "bg-system-blue", text: "text-system-blue" } },
        { type: "ความกล้าแสดงออก", point: 2003, icon: { Icon: Star, color: "bg-primary-3", text: "text-primary-3" } },
        { type: "ความแข่งขัน", point: 2003, icon: { Icon: Trophy, color: "bg-primary-2", text: "text-primary-2" } },
        { type: "ระเบียบวินัย", point: 0, icon: { Icon: Clock, color: "bg-secondary-3", text: "text-secondary-3" } },
        { type: "ความรับผิดชอบ", point: 0, icon: { Icon: ListChecks, color: "bg-system-error-2", text: "text-system-error-2" } },
        { type: "ความเป็นผู้นำ", point: 0, icon: { Icon: Crown, color: "bg-secondary-2", text: "text-secondary-2" } },
    ]
    return (
        <BrandingBackground>
            <MemoCard size="full" className="gap-y-lg !p-0">
                <SummaryCircle totalPoints={totalPoints} pointsToNextLevel={pointsToNextLevel} />
                <ScrollableView border={false} className="gap-y-lg px-[1.5rem]">
                    {aptitudes.map(({ type, point, icon }, index) => (
                        <AptitudeItem type={type} point={point} icon={icon} key={index + type} />
                    ))}
                </ScrollableView>
            </MemoCard>
        </BrandingBackground>
    )
}