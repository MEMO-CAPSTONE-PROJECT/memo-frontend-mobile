import { Color } from "@/constants/theme/color";
import { Text, View } from "react-native";
import PieChart from "react-native-pie-chart";

interface MemoDonutChartProps {
    width?: number
    height?: number
    point?: number
    coverRadius?: number
    series: number[]
    colors: string[]
}

export default function MemoDonutChart({ width = 220, height = 220, coverRadius = 0.75, point, series , colors }: Readonly<MemoDonutChartProps>) {
    const isEmpty = series.length === 0 || colors.length === 0 || series.length !== colors.length || series.reduce((previous, current) => previous + current, 0) === 0
    return (
        <View className={`relative justify-center items-center`} style={{ width: width, height: height}}>
            {isEmpty ? <PieChart
                    widthAndHeight={width}
                    series={[1,2]}
                    sliceColor={Array(2).fill(Color["title-1"])}
                    coverRadius={coverRadius}
                    coverFill={Color["system-white"]}
            /> : <PieChart
                    widthAndHeight={width}
                    series={series}
                    sliceColor={colors}
                    coverRadius={coverRadius}
                    coverFill={Color["system-white"]}
                />
            }   
            {point !== undefined && (
                <View className="absolute w-[140] h-[140] bg-system-light-purple rounded-circle items-center justify-center">
                    <Text className="font-kanit-bold text-header text-title-1">{String?.(point) ?? "0"}</Text>
                    <Text className="font-kanit-bold text-caption-2 text-primary-3">คะแนนรวมทั้งหมด</Text>
                </View>
            )}
        </View>
    )
}