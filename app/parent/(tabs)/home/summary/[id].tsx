import BrandingBackground from "@/components/background/branding-background";
import MemoDonutChart from "@/components/chart/memo-donut-chart";
import MemoLineChart from "@/components/chart/memo-line-chart";
import MemoBaseNavigatorCard from "@/components/container/base/memo-base-navigator-card";
import MemoCard from "@/components/container/memo-card";
import ScrollableView from "@/components/scrollable/scrollable-view";
import { getMemoBorderRadius } from "@/constants/theme/border-radius";
import { Color } from "@/constants/theme/color";
import { getMemoLayoutSize } from "@/constants/theme/layout-size";
import { useHistoryCountByTypeQuery, useHistoryScoresAptitudeComparisonQuery } from "@/hooks/query/useHistoryAnalysisQuery";
import { useLocalSearchParams } from "expo-router";
import { CaretDown } from "phosphor-react-native";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { Accordion, Square } from "tamagui";

// Types for better type safety
type HistoryCountItem = {
  status: string;
  count: number;
  percentage: number;
};

type ScoreData = {
  currentWeekTotal?: number;
  previousWeekTotal?: number;
  percentChange?: number;
};

export default function SummaryByIdScreen() {
    const { type, color, studentId } = useLocalSearchParams<{ type: string; color: string; studentId: string }>();
    const { data: rawHistoryCountByType } = useHistoryCountByTypeQuery(studentId, type);
    const { data: rawHistoryScoresAptitudeComparison } = useHistoryScoresAptitudeComparisonQuery(studentId, type);

    const [weekScores, setWeekScores] = useState({
        current: 0,
        previous: 0,
        currentDaily: [0, 0, 0, 0, 0],
        previousDaily: [0, 0, 0, 0, 0]
    });

    const labels = useMemo(() => ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์'], []);
    const historyCountByType = rawHistoryCountByType?.data?.results || [];
    const historyScoresAptitudeComparison = useMemo(() => 
            rawHistoryScoresAptitudeComparison?.data?.results || []
    , [rawHistoryScoresAptitudeComparison]);

    // Constants for chart colors 
    const CHART_COLORS = {
        "completed": Color["system-success"],
        "in-progress": Color["system-blue"]
    };
    
    // Extract count data with default values
    const completed = historyCountByType.find(count => count.status === "completed") || {
        status: "completed",
        count: 0,
        percentage: 0
    };
    
    const inProgress = historyCountByType.find(count => count.status === "in-progress") || {
        status: "in-progress",
        count: 0,
        percentage: 0
    };
    
    const historyCount = historyCountByType.reduce((previous, current) => previous + current.count, 0) || 0;

    // Process score data
    useEffect(() => {
        if (historyScoresAptitudeComparison && historyScoresAptitudeComparison.length > 0) {
            const currentScores = [];
            const previousScores = [];
            let totalCurrentWeekScore = 0;
            let totalPreviousWeekScore = 0;
    
            for (let index = 0; index < labels.length; index++) {
                const day = historyScoresAptitudeComparison[index] || {};
                const currentScore = day.currentWeekTotal || 0;
                const previousScore = day.previousWeekTotal || 0;
    
                currentScores.push(currentScore);
                previousScores.push(previousScore);
                totalCurrentWeekScore += currentScore;
                totalPreviousWeekScore += previousScore;
            }
    
            setWeekScores({
                current: totalCurrentWeekScore,
                previous: totalPreviousWeekScore,
                currentDaily: currentScores,
                previousDaily: previousScores
            });
        }
    }, [historyScoresAptitudeComparison, labels]);

    // Calculate percentage change
    const percentageChange = calculatePercentageChange(weekScores.current, weekScores.previous);

    return (
        <BrandingBackground>
            <MemoCard size="full" className="!p-0 !pt-0">
                <ScrollableView border={false} className="gap-y-lg pt-[2rem] p-[1.5rem]">
                    <View className="flex-col">
                        <Text className="font-kanit-bold text-title-1 text-title">วิเคราะห์กิจกรรม{type}</Text>
                        <Text className="font-kanit-regular text-body-1 text-caption-1">กราฟแสดงข้อมูลการเข้าร่วมจิตอาสาของนักเรียน</Text>
                    </View>
                    <ActivitiesOverviewCard 
                        type={type} 
                        color={color} 
                        historyCount={historyCount} 
                        completed={completed} 
                        inProgress={inProgress} 
                        chartColors={CHART_COLORS} 
                    />
                    <WeeklyComparisonCard 
                        type={type} 
                        color={color} 
                        percentage={percentageChange} 
                        weekScores={weekScores}
                        labels={labels}
                        comparisonData={historyScoresAptitudeComparison}
                    />
                </ScrollableView>
            </MemoCard>
        </BrandingBackground>
    );
}

function ActivitiesOverviewCard({ 
    type, 
    color, 
    historyCount, 
    completed, 
    inProgress, 
    chartColors 
}: { 
    type: string; 
    color: string; 
    historyCount: number; 
    completed: HistoryCountItem; 
    inProgress: HistoryCountItem; 
    chartColors: Record<string, string>;
}) {
    return (
        <MemoBaseNavigatorCard disabled disabledStyled={false} className="flex-col !items-start gap-y-lg">
            <View className="gap-y-sm">
                <Text className="font-kanit-bold text-title-1 text-body">กิจกรรม{type}ที่ได้ทำทั้งหมด</Text>
                <View className="px-md rounded-xsm w-full" style={{ backgroundColor: color }}>
                    <Text className="font-kanit-medium text-system-white">{historyCount} กิจกรรม</Text>
                </View>
            </View>
            <View className="w-full items-center">
                <MemoDonutChart 
                    width={150} 
                    height={150} 
                    coverRadius={0.6} 
                    series={[completed.count, inProgress.count]} 
                    colors={[chartColors.completed, chartColors["in-progress"]]} 
                />
            </View>
            <StatusRow 
                count={completed.count} 
                percentage={completed.percentage} 
                color={chartColors.completed} 
                label="ทำสำเร็จ" 
            />
            <StatusRow 
                count={inProgress.count} 
                percentage={inProgress.percentage} 
                color={chartColors["in-progress"]} 
                label="กำลังทำ" 
            />
        </MemoBaseNavigatorCard>
    );
}

function StatusRow({ count, percentage, color, label }: { count: number; percentage: number; color: string; label: string }) {
    return (
        <View className="flex-row justify-between">
            <View className="flex-1 flex-row items-center gap-x-md">
                <View className="w-3 h-3 rounded-circle" style={{ backgroundColor: color }} />
                <Text className="font-kanit-bold text-caption-1 text-primary-3">{count} กิจกรรม ({percentage}%)</Text>
            </View>
            <Text className="font-kanit-medium text-caption-1 text-primary-2">{label}</Text>
        </View>
    );
}

interface WeeklyComparisonCardProps {
    type: string; 
    color: string; 
    percentage: number; 
    weekScores: {
        current: number;
        previous: number;
        currentDaily: number[];
        previousDaily: number[];
    };
    labels: string[];
    comparisonData: ScoreData[];
}

function WeeklyComparisonCard({ 
    type, 
    color, 
    percentage, 
    weekScores,
    labels,
    comparisonData
}: Readonly<WeeklyComparisonCardProps>) {
    const percentageColor = () => {
        if (percentage === 0) return Color["body-1"]
        else if (percentage > 0) return Color["system-green"]
        else return Color["system-error-2"]
    }
    const percentageLabel = () => {
        if (percentage === 0) return "เท่าเดิม"
        else if (percentage > 0) return "เพิ่มขึ้น " + percentage + "%"
        else return "ลดลง " + percentage.toString().replace("-", "") + "%"
    }
    return (
        <MemoBaseNavigatorCard disabled disabledStyled={false} className="flex-col !items-start gap-y-lg">
            <View className="gap-y-sm">
                <Text className="font-kanit-bold text-title-1 text-body">เปรียบเทียบ{type}ที่ทำสำเร็จใน 2 สัปดาห์ก่อน</Text>
                <View className="px-md rounded-xsm w-full" style={{ backgroundColor: percentageColor() }}>
                    <Text className="font-kanit-medium text-system-white">{percentageLabel()} จากสัปดาห์ก่อนหน้า</Text>
                </View>
            </View>
            <View>
                <MemoLineChart
                    labels={labels}
                    datas={[
                        {
                            value: weekScores.previousDaily,
                            lineColor: color,
                            backgroundColor: color,
                            opacity: 0.2,
                            strokeWidth: 2,
                        },
                        {
                            value: weekScores.currentDaily,
                            lineColor: color,
                            backgroundColor: color,
                            opacity: 0.6,
                            strokeWidth: 2,
                        }
                    ]}
                />
            </View>
            <ScoreAccordion 
                color={color}
                weekScores={weekScores}
                labels={labels}
                comparisonData={comparisonData}
            />
        </MemoBaseNavigatorCard>
    );
}

interface ScoreAccordionProps {
    color: string;
    weekScores: {
        current: number;
        previous: number;
        currentDaily: number[];
        previousDaily: number[];
    };
    labels: string[];
    comparisonData: ScoreData[];
}

function ScoreAccordion({ 
    color, 
    weekScores, 
    labels, 
    comparisonData 
}: Readonly<ScoreAccordionProps>) {
    const comparisonDataPercent = (index: number) => comparisonData[index]?.percentChange || 0
    const comparisonDataColor = (index: number) => {
        const percent = comparisonDataPercent(index) 
        if (percent === 0) return Color["body-2"]
        else if (percent > 0) return Color["system-success"]
        else return Color["system-error-2"]
    }
    const comparisonDataLabel = (index: number) => {
        const percent = Number(comparisonDataPercent(index).toFixed(2))
        if (percent === 0) return "เท่าเดิม"
        else if (percent > 0) return "เพิ่มขึ้น " + percent + "%"
        else return "ลดลง " + percent.toString().replace("-", "") + "%"
    }
    return (
        <Accordion overflow="hidden" width="100%" type="multiple" gap={getMemoLayoutSize("lg")}>
            <AccordionItem 
                value="current-week"
                color={color}
                opacity={0.8}
                score={weekScores.current}
                label="สัปดาห์ที่ผ่านมา"
            >
                {weekScores.currentDaily.map((score, index) => (
                    <Text 
                        key={`current-day-${index}`} 
                        className="font-kanit-medium text-caption-1 text-title-1"
                    >
                        {'\u25CF'} วัน{labels[index]} {score} คะแนน 
                        <Text style={{ color: comparisonDataColor(index) }}> ({comparisonDataLabel(index)})</Text>
                    </Text>
                ))}
            </AccordionItem>
            <AccordionItem 
                value="previous-week"
                color={color}
                opacity={0.3}
                score={weekScores.previous}
                label="สัปดาห์ก่อนหน้า"
            >
                {weekScores.previousDaily.map((score, index) => (
                    <Text 
                        key={`previous-day-${index}`} 
                        className="font-kanit-medium text-caption-1 text-title-1"
                    >
                        {'\u25CF'} วัน{labels[index]} {score} คะแนน
                    </Text>
                ))}
            </AccordionItem>
        </Accordion>
    );
}

type AccordionItemProps = {
    value: string;
    color: string;
    opacity: number;
    score: number;
    label: string;
    children: React.ReactNode;
};

function AccordionItem({ value, color, opacity, score, label, children }: AccordionItemProps) {
    return (
        <Accordion.Item value={value}>
            <Accordion.Trigger 
                flexDirection="row" 
                justifyContent="space-between" 
                backgroundColor={Color["system-lightest-gray"]} 
                borderRadius={getMemoBorderRadius("sm")}
            >
                {({ open }: { open: boolean }) => (
                    <>
                        <View className="flex-1 flex-row items-center gap-x-md">
                            <View 
                                className="w-3 h-3 rounded-circle" 
                                style={{ backgroundColor: color, opacity }}
                            />
                            <Text className="font-kanit-bold text-caption-1 text-primary-3">
                                {score} คะแนน
                                <Text className="font-kanit-medium text-primary-2"> {label}</Text>
                            </Text>
                        </View>
                        <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                            <CaretDown size={24} weight="bold" color={Color["body-1"]} />
                        </Square>
                    </>
                )}
            </Accordion.Trigger>
            <Accordion.HeightAnimator animation="medium">
                <Accordion.Content 
                    animation="medium" 
                    exitStyle={{ opacity: 0 }} 
                    backgroundColor={Color["system-white"]}
                >
                    {children}
                </Accordion.Content>
            </Accordion.HeightAnimator>
        </Accordion.Item>
    );
}

// Helper function to calculate percentage change
function calculatePercentageChange(current: number, previous: number): number {
    return Number(((current - previous) / (previous === 0 ? 1 : previous) * 100).toFixed(2));
}