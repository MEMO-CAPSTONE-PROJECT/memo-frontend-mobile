import BrandingBackground from "@/components/background/branding-background"
import MemoDonutChart from "@/components/chart/memo-donut-chart"
import MemoCard from "@/components/container/memo-card"
import ScrollableView from "@/components/scrollable/scrollable-view"
import AptitudeTierDiamondSvg from "@/components/ui/icons/aptitude-tier/diamond-svg"
import AptitudeTierEmeraldSvg from "@/components/ui/icons/aptitude-tier/emerald-svg"
import AptitudeTierGoldSvg from "@/components/ui/icons/aptitude-tier/gold-svg"
import AptitudeTierSilverSvg from "@/components/ui/icons/aptitude-tier/silver-svg"
import AptitudeTierWoodSvg from "@/components/ui/icons/aptitude-tier/wood-svg"
import { AptitudeColor } from "@/constants/aptitude-color"
import { Color } from "@/constants/theme/color"
import { useStudentById } from "@/hooks/useUser"
import { useStudentToken } from "@/hooks/useUserToken"
import { getAptitudeColor } from "@/shared/utils/aptitude-util"
import { Icon, Info } from "phosphor-react-native"
import { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Adapt, Dialog, Sheet } from "tamagui"

// interface ProgressBarProps {
//     progress: number
// }

// function ProgressBar({ progress }: Readonly<ProgressBarProps>) {
//     return (
//         <View className="w-full">
//             <View className="w-full h-md rounded-sm bg-system-light-gray" />
//             <View
//                 className="absolute h-md rounded-sm bg-secondary-2"
//                 style={{ width: `${progress * 100}%` }}
//             />
//         </View>
//     )
// }

// interface SummaryCircleProps {
//     totalPoints: number
//     pointsToNextLevel: number
// }

// function SummaryCircle({ totalPoints, pointsToNextLevel }: Readonly<SummaryCircleProps>) {
//     return (
//         <View className="w-full px-[1.5rem] items-center gap-y-md">
//             <Text className="font-kanit-bold text-title">ความสามารถที่โดดเด่นในแต่ละด้าน</Text>
//             <View className="w-60 h-60 border-[25px] border-primary-3 rounded-circle items-center justify-center">
//                 <View className="w-40 h-40 items-center justify-center rounded-circle bg-system-light-purple">
//                     <Text className="font-kanit-bold text-header text-title-1">{totalPoints}</Text>
//                     <Text className="font-kanit-bold text-caption-2 text-primary-3">คะแนนรวมทั้งหมด</Text>
//                 </View>
//             </View>
//             { /* ProgressBar */}
//             <Text className="font-kanit-medium text-caption-1">อีก <Text className="font-kanit-bold text-secondary-2">{pointsToNextLevel}</Text> คะแนน ถึงจะไปเลเวลถัดไป</Text>
//             <ProgressBar progress={0.5} />
//         </View>
//     )
// }

interface AptitudeItemProps {
    type: string
    point: number
    totalPoint: number
    icon?: {
        Icon?: Icon
        color?: string
        text?: string
    }
}

const TIER_ICON_SIZE = 70
const Criteria = [
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
];

function AptitudeItem({
    type,
    point,
    totalPoint,
    icon,
}: Readonly<AptitudeItemProps>) {
    const percent = point/totalPoint*100
    const { name, icon: tier } = Criteria.find((criterion) => percent > criterion.percent) ?? Criteria[Criteria.length - 1]

    return (
        <View className="w-full bg-system-lightest-gray flex-row items-center justify-between pl-lg p-md rounded-sm">
            <View className="flex-row gap-x-lg items-center">
                <View 
                    className={`w-6 h-6 rounded-sm items-center justify-center`}
                    style={{ backgroundColor: icon?.color ?? "" }}
                >
                    {/* {icon?.Icon && <icon.Icon color={Color["system-white"]} weight="fill" size={12} />} */}
                </View>
                <View>
                    <Text 
                        className={`font-kanit-medium text-caption-1`}
                        style={{ color: icon?.text ?? "" }}
                    >
                        {type}
                    </Text>
                    <Text className="font-kanit-regular text-caption-2">{point} คะแนน ({percent.toFixed(1)}%)</Text>
                </View>
            </View>
            <Text className="pr-[62] font-kanit-bold text-title-1">{name}</Text>
            <View className="absolute bottom-0 right-0">{tier}</View>
        </View>
    )
}

export default function StudentAptitudeOverallScreen() {
    const { data: student } = useStudentToken()
    const [totalPoints, setTotalPoints] = useState(0)
    const [points, setPoints] = useState<number[]>([])
    const [colors, setColors] = useState<string[]>([])
    const { data, refetch } = useStudentById(student?.sub ?? "")

    // Calculate total points when data is available
    useEffect(() => {
        if (data?.data?.student?.points) {
            const updatedPoints = []
            const updatedColors = []
            let updatedTotalPoints = 0
    
            for (const { point, color } of data.data.student.points) {
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
    }, [data])
    const aptitudes = data?.data?.student?.points?.map(
        ({ type, color, point }, index) => {
            const { icon, color: colorCode } = color in AptitudeColor ? AptitudeColor[color] : {}
            return <AptitudeItem 
                        type={type} 
                        point={point} 
                        totalPoint={totalPoints}
                        icon={{ Icon: icon, color: colorCode, text: colorCode }} 
                        key={index + type} 
                    />
    }) ?? []
    async function handleRefresh() {
        refetch()
    }

    return (
        <BrandingBackground>
            <MemoCard size="full" className="gap-y-lg !p-0 items-center">
                {/* <SummaryCircle totalPoints={totalPoints} pointsToNextLevel={pointsToNextLevel} /> */}
                <View className="flex-row items-center gap-x-sm">
                    <Text className="font-kanit-bold text-title">ความสามารถที่โดดเด่นในแต่ละด้าน</Text>
                    <Dialog modal>
                        <Dialog.Trigger asChild>
                            <TouchableOpacity>
                                <Info color={Color["system-blue"]} size={24} weight="fill" />
                            </TouchableOpacity>
                        </Dialog.Trigger>
                        <Adapt when="sm" platform="touch">
                            <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
                                <Sheet.Frame padding="$4" gap="$4">
                                    <Adapt.Contents />
                                </Sheet.Frame>
                                <Sheet.Overlay
                                    animation="lazy"
                                    enterStyle={{ opacity: 0 }}
                                    exitStyle={{ opacity: 0 }}
                                />
                            </Sheet>
                        </Adapt>

                        <Dialog.Portal>
                            <Dialog.Overlay />
                            <Dialog.Content
                                key="dialog-content"
                            >
                                <Text className="font-kanit-bold text-title text-title-1">เกี่ยวกับความสามารถที่โดดเด่น</Text>
                                {Criteria.map(({ name, icon, percent }, index) => (
                                    <View key={name} className="p-xl flex-row items-center justify-between">
                                        <View className="flex-row gap-x-5xl">
                                            <View className="w-6 h-6 rounded-sm items-center justify-center">
                                                {icon}
                                            </View>
                                            <Text className="font-kanit-medium text-body w-24 text-start">{name}</Text>
                                        </View>
                                        <View className="bg-system-lightest-gray rounded-sm px-lg py-sm w-32">
                                            <Text className="font-kanit-medium text-title text-center">&gt; {percent}%</Text>
                                        </View>
                                    </View>
                                ))}
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog>
                </View>
                <MemoDonutChart 
                    point={totalPoints}
                    series={points} 
                    colors={colors} 
                />
                <ScrollableView border={false} className="gap-y-xl p-[1.5rem]" onRefresh={handleRefresh}>
                    {aptitudes}
                </ScrollableView>
            </MemoCard>
        </BrandingBackground>
    )
}