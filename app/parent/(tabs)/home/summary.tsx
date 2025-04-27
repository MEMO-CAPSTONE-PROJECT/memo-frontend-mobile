import BrandingBackground from "@/components/background/branding-background";
import MemoBaseNavigatorCard from "@/components/container/base/memo-base-navigator-card";
import MemoCard from "@/components/container/memo-card";
import MemoLongCard from "@/components/container/memo-long-card";
import ScrollableView from "@/components/scrollable/scrollable-view";
import MountainChart from "@/components/ui/icons/natural/mountain-chart";
import { Color } from "@/constants/theme/color";
import { useGetAptitudesQuery } from "@/hooks/query/useAptitudeQuery";
import { useHistoryAchievementCount, useHistoryAchievementMaxScoreQuery, useHistoryScoresAptitudesQuery, useHistoryScoresWeekQuery } from "@/hooks/query/useHistoryAnalysisQuery";
import { getAptitudeColor } from "@/shared/utils/aptitude-util";
import { router, useLocalSearchParams } from "expo-router";
import { CaretRight } from "phosphor-react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

// const data = [
//   { label: "ม.ค.", value: 10 },
//   { label: "ก.พ.", value: 20 },
//   { label: "มี.ค.", value: 20 },
//   { label: "เม.ย.", value: 5 },
//   { label: "พ.ค.", value:  1 },
//   { label: "มิ.ย.", value:  20 },
//   { label: "ก.ย.", value:  1 },
//   { label: "ม.ย.", value:  5 },
//   { label: "พ.ย.", value:  1 },
//   { label: "ธ.ค.", value:  1 },
//   { label: "ธ.ย.", value:  1 },
//   { label: "ธ.ร.", value:  10 },
// ]
// const colors = ["#CB5237","#F3C72F","#A8BF39","#258848", "#14A39D"]
// const colors = [Color["body-1"], Color["body-2"], Color["grass-green"], Color["grass-dark-green"], Color["system-success"]]

export default function ParentSummaryScreen() {
  const { studentId } = useLocalSearchParams()
  const [data, setData] = useState<{ label: string, value: number }[]>([])
 
  const { data: rawHistoryScoresAptitudes, refetch: refetchHistoryScoresAptitudes } = useHistoryScoresAptitudesQuery(studentId as string)
  const { data: rawHistoryScoresWeek, refetch: refetchHistoryScoresWeek } = useHistoryScoresWeekQuery(studentId as string)
  const { data: rawHistoryAchievementMaxScore, refetch: refetchHistoryAchievementMaxScore } = useHistoryAchievementMaxScoreQuery(studentId as string)
  const { data: rawHistoryAchievementCount, refetch: refetchHistoryAchievementCount } = useHistoryAchievementCount(studentId as string)
  const { data: rawAptitudes } = useGetAptitudesQuery()

  const colors = ["#B0CF2C", "#85B021", "#639850", "#277C5A", "#004E38"]
  const aptitudes = rawAptitudes?.data?.aptitudes ?? []
  const maxAchievementScore = rawHistoryAchievementMaxScore?.data?.result ?? { type: "ไม่มี", count: 0 }
  const historyScoresAptitudes = rawHistoryScoresAptitudes?.data?.results ?? []
  const achievementSize = rawHistoryAchievementCount?.data?.results ?? 0
  
  const historyScoresWeek = useMemo(() =>
    rawHistoryScoresWeek?.data?.points ?? [
      { nameDay: "จันทร์", dayOfWeek: 1, activityCount: 0 },
      { nameDay: "อังคาร", dayOfWeek: 2, activityCount: 0 },
      { nameDay: "พุธ", dayOfWeek: 3, activityCount: 0 },
      { nameDay: "พฤหัส", dayOfWeek: 4, activityCount: 0 },
      { nameDay: "ศุกร์", dayOfWeek: 5, activityCount: 0 },
    ], [rawHistoryScoresWeek])
  
  useEffect(() => {
      const labels = ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์"]
      
      setData([])
      setData(() => {
        return labels.map((label, index) => {
          const dayOfWeek = index + 1; // 1 = Monday, 2 = Tuesday, etc.
    
          const matchingDay = historyScoresWeek.find(
            (day) => day.dayOfWeek === dayOfWeek
          );
    
          return {
            label,
            value: matchingDay?.activityCount ?? 0,
          };
        })
      })
  }, [historyScoresWeek])

  function handleSummary(id: string, type: string, color: string, light: string) {
      router.push({ 
        pathname: "/parent/home/summary/[id]", 
        params: { id: id, type: type, color: color, light: light, studentId: studentId }
      })
  }
  function handleRefresh() {
    refetchHistoryScoresAptitudes()
    refetchHistoryScoresWeek()
    refetchHistoryAchievementMaxScore()
    refetchHistoryAchievementCount()
  }

  return (
    <BrandingBackground variant="secondary">
      <ScrollableView onRefresh={handleRefresh}>
        <MountainChart colors={colors} data={data}>
          <View className="p-[1.5rem]">
            <Text className="font-kanit-bold text-title text-title-1">กิจกรรมเป้าหมายที่ได้ทำทั้งหมด</Text>
            <Text className="font-kanit-regular text-caption-1 text-body-1">ข้อมูลแสดงจำนวนที่เข้าร่วมกิจกรรมของนักเรียนในแต่ละวัน</Text>
            <Text className="font-kanit-regular text-caption-1 text-system-blue">{`\u2022 จำนวนกิจกรรม`}</Text>
            <Text className="font-kanit-regular text-caption-1 text-system-blue">{`\u2022 วันในสัปดาห์`}</Text>
          </View>
        </MountainChart>
        <MemoCard size="full" containerRounded={false} className="gap-y-lg !pt-lg">
          <View className="flex-row gap-x-lg">
            <MemoLongCard className="flex-1" height={90} circleSize={90}>
              <View className="flex-row p-md gap-x-md items-center justify-between">
                <View className="flex-1 items-center">
                  <Text className="font-kanit-bold text-caption-1 text-center text-title-1">สูงสุด</Text>
                  <Text className="font-kanit-regular text-caption-1 text-title-1 text-center">{maxAchievementScore.type}</Text>
                </View>
                <View className="bg-system-white w-20 h-20 rounded-sm items-center justify-center">
                  <Text className="font-kanit-bold text-title text-title-1">{maxAchievementScore.count}</Text>
                  <Text className="font-kanit-regular text-caption-1 text-title-1">กิจกรรม</Text>
                </View>
              </View>
            </MemoLongCard>
            <MemoLongCard className="flex-1" height={90} circleSize={90}>
              <View className="flex-row p-md gap-x-md items-center justify-between">
                <View className="flex-1 items-center">
                  <Text className="font-kanit-bold text-caption-1 text-center text-title-1">เข้าร่วมทั้งหมด</Text>
                </View>
                <View className="bg-system-white w-20 h-20 rounded-sm items-center justify-center">
                  <Text className="font-kanit-bold text-title text-title-1">{achievementSize}</Text>
                  <Text className="font-kanit-regular text-caption-1 text-title-1">กิจกรรม</Text>
                </View>
              </View>
            </MemoLongCard>
          </View>
          <Text className="font-kanit-bold text-title-1 text-body">เปรียบเทียบกิจกรรมแต่ละประเภท 2 สัปดาห์ก่อน</Text>
          {historyScoresAptitudes.length === 0 ? 
            <Text className="font-kanit-regular text-caption-1 text-title-1">ไม่มีกิจกรรมที่ได้ทำใน 2 สัปดาห์ก่อน</Text> : 
            historyScoresAptitudes?.map((score) => {
                const aptitude = aptitudes.find(aptitude => aptitude.type === score.type)
                if (!aptitude) return null
                const aptitudeColor = getAptitudeColor(aptitude.color)
                if (!aptitudeColor) return null
                const { color, light, icon: Icon } = aptitudeColor
                return (
                  <MemoBaseNavigatorCard key={aptitude.type} className="gap-x-lg" onPress={() => handleSummary(aptitude.id, aptitude.type, color, light)}>
                    <View className="flex-row gap-x-lg flex-1">
                      <View className={`justify-center items-center w-[50] h-[50] rounded-xsm`} style={{ backgroundColor: color }}>
                        <Icon color={Color["system-white"]} weight="fill" size={32} />
                      </View>
                      <View className="flex-col flex-shrink justify-center">
                        <Text className="font-kanit-bold text-body text-title-1">{aptitude.type}</Text>
                        <Text className="font-kanit-regular text-caption-1 text-title-1">สัปดาห์ที่แล้ว {score.currentWeekScore} คะแนน 
                          <Text className={`${score.percentChange > 0 ? "text-system-success" : "text-system-error" }`}> 
                            &nbsp;({(score.percentChange > 0 ? "+" : "")}{Number(score.percentChange.toFixed(2))}%)
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <CaretRight color={Color["body-1"]} weight="bold"/>
                  </MemoBaseNavigatorCard>
                )
              })
            }
        </MemoCard>
      </ScrollableView>
    </BrandingBackground>
  )
}