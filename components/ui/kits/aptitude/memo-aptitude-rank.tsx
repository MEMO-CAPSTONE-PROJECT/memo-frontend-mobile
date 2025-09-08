import { RankCriteria } from "@/shared/types/criteria-type"
import { Icon } from "phosphor-react-native"
import { Text, View } from "react-native"

interface MemoAptitudeRankProps {
    criteria: RankCriteria[] 
    type: string
    point: number
    totalPoint: number
    icon?: {
        Icon?: Icon
        color?: string
        text?: string
    }
}

export default function MemoAptitudeRank({
    criteria,
    type,
    point,
    totalPoint,
    icon,
}: Readonly<MemoAptitudeRankProps>) {
    const percent = totalPoint === 0 ? 0 : (point / totalPoint) * 100
    const { name, icon: tier } = criteria.find((criterion) => percent > criterion.percent) ?? criteria[criteria.length - 1]

    return (
        <View className="w-full bg-system-lightest-gray flex-row items-center justify-between pl-lg p-md rounded-sm">
            <View className="flex-row gap-x-lg items-center">
                <View 
                    className={`w-6 h-6 rounded-sm items-center justify-center`}
                    style={{ backgroundColor: icon?.color ?? "" }}
                />
                <View>
                    <Text className={`font-kanit-medium text-caption-1`} style={{ color: icon?.text ?? "" }}>
                        {type}
                    </Text>
                    <Text className="font-kanit-regular text-caption-2">
                        {point} คะแนน ({percent.toFixed(1)}%)
                    </Text>
                </View>
            </View>
            <Text className="pr-[62] font-kanit-bold text-title-1">{name}</Text>
            <View className="absolute bottom-0 right-0">{tier}</View>
        </View>
    )
}