import BrandingBackground from "@/components/background/branding-background";
import MemoBaseNavigatorCard from "@/components/container/base/memo-base-navigator-card";
import MemoCard from "@/components/container/memo-card";
import MemoLongCard from "@/components/container/memo-long-card";
import ScrollableView from "@/components/scrollable/scrollable-view";
import MountainChart from "@/components/ui/icons/natural/mountain-chart";
import { Color } from "@/constants/theme/color";
import { useGetAptitudesQuery } from "@/hooks/query/useAptitudeQuery";
import { getAptitudeColor } from "@/shared/utils/aptitude-util";
import { CaretRight } from "phosphor-react-native";
import React from "react";
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
  const data = [
    { label: "จันทร์", value:  5 },
    { label: "อังคาร", value: 10 },
    { label: "พุธ", value: 2 },
    { label: "พฤหัส", value: 1 },
    { label: "ศุกร์", value: 6 },
  ]
  const colors = ["#B0CF2C", "#85B021", "#639850", "#277C5A", "#004E38"]
  const { data: rawAptitudes } = useGetAptitudesQuery()
  const aptitudes = rawAptitudes?.data?.aptitudes ?? []

  return (
    <BrandingBackground variant="secondary">
      <ScrollableView>
        <MountainChart colors={colors} data={data}>
          <View className="p-[1.5rem]">
            <Text className="font-kanit-bold text-title text-title-1">กิจกรรมเป้าหมายทั้งหมด</Text>
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
                  <Text className="font-kanit-regular text-caption-1 text-title-1">จิตอาสา</Text>
                </View>
                <View className="bg-system-white w-20 h-20 rounded-sm items-center justify-center">
                  <Text className="font-kanit-bold text-title text-title-1">25</Text>
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
                  <Text className="font-kanit-bold text-title text-title-1">{data.reduce((acc, cur) => acc + cur.value, 0)}</Text>
                  <Text className="font-kanit-regular text-caption-1 text-title-1">กิจกรรม</Text>
                </View>
              </View>
            </MemoLongCard>
          </View>
          <Text className="font-kanit-bold text-title-1 text-body">กิจกรรมเป้าหมายในแต่ละประเภท</Text>
          {aptitudes?.map((aptitude) => {
            const aptitudeColor = getAptitudeColor(aptitude.color)
            if (!aptitudeColor) return null
            const { color, icon: Icon } = aptitudeColor
            return (
              <MemoBaseNavigatorCard className="gap-x-lg" >
                <View className="flex-row gap-x-lg flex-1">
                  <View className={`justify-center items-center w-[50] h-[50] rounded-xsm`} style={{ backgroundColor: color }}>
                    <Icon color={Color["system-white"]} weight="fill" size={32} />
                  </View>
                  <View className="flex-col flex-shrink justify-center">
                    <Text className="font-kanit-bold text-body text-title-1">{aptitude.type}</Text>
                    <Text className="font-kanit-regular text-caption-1 text-title-1">สัปดาห์นี้ทำได้ 25 คะแนน <Text className="text-system-success">(+10%)</Text></Text>
                  </View>
                </View>
                <CaretRight color={Color["body-1"]} weight="bold"/>
              </MemoBaseNavigatorCard>
            )
          })}
        </MemoCard>
      </ScrollableView>
    </BrandingBackground>
  )
}