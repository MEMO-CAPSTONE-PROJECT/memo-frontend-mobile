import { Color } from "@/constants/theme/color";
import { Text } from "react-native";
import { View } from "react-native";
import PieChart from "react-native-pie-chart";

interface MemoDonutChartProps {
    point: number
    series: number[]
    colors: string[]
}

export default function MemoDonutChart({ point, series , colors }: Readonly<MemoDonutChartProps>) {
    return (
        <View className="relative w-[220] h-[220] justify-center items-center">
            <PieChart
                widthAndHeight={220}
                series={series}
                sliceColor={colors}
                coverRadius={0.75}
                coverFill={Color["system-white"]}
            />
            <View className="absolute w-[140] h-[140] bg-system-light-purple rounded-circle items-center justify-center">
                <Text className="font-kanit-bold text-header text-title-1">{point}</Text>
                <Text className="font-kanit-bold text-caption-2 text-primary-3">คะแนนรวมทั้งหมด</Text>
            </View>
        </View>
    )
}