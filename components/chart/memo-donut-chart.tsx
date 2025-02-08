import { Color } from "@/constants/theme/color";
import { Text, View } from "react-native";
import PieChart from "react-native-pie-chart";

interface MemoDonutChartProps {
    point: number
    series: number[]
    colors: string[]
}

export default function MemoDonutChart({ point, series , colors }: Readonly<MemoDonutChartProps>) {
    const isEmpty = series.length === 0 || colors.length === 0 || series.length !== colors.length || series.reduce((previous, current) => previous + current, 0) === 0
    return (
        <View className="relative w-[220] h-[220] justify-center items-center">
            {isEmpty ? <PieChart
                    widthAndHeight={220}
                    series={[1,2,3,4,5]}
                    sliceColor={Array(5).fill(Color["primary-3"])}
                    coverRadius={0.75}
                    coverFill={Color["system-white"]}
            /> : <PieChart
                    widthAndHeight={220}
                    series={series}
                    sliceColor={colors}
                    coverRadius={0.75}
                    coverFill={Color["system-white"]}
                />
            }   
            <View className="absolute w-[140] h-[140] bg-system-light-purple rounded-circle items-center justify-center">
                <Text className="font-kanit-bold text-header text-title-1">{point}</Text>
                <Text className="font-kanit-bold text-caption-2 text-primary-3">คะแนนรวมทั้งหมด</Text>
            </View>
        </View>
    )
}