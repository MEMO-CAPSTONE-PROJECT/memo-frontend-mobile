import BrandingBackground from "@/components/background/branding-background";
import MemoCard from "@/components/container/memo-card";
import MemoNavigatorCard from "@/components/container/memo-navigator-card";
import { ChartBar, ChartDonut, CheckFat } from "phosphor-react-native";
import { Text, View } from "react-native";

export default function ParentHomeScreen() {
    const name = "ด.ญ. ธัณย์นิชา สมภาร"
    const classroom = "ชั้นประถมศึกษาปีที่ 4/2"
    return (
      <BrandingBackground variant="secondary" appbar>
          <MemoCard size="full" className="gap-y-3xl">
            <View>
                <View className="gap-y-sm">
                    <Text className="font-kanit-bold text-title text-body-1">สวัสดี</Text>
                    <Text className="font-kanit-medium text-body text-body-1">{name}</Text>
                    <Text className="font-kanit-regular text-caption-1 text-body-2">{classroom}</Text>
                </View>
            </View>    
            <View className="gap-y-lg">
                <MemoNavigatorCard title="วิเคราะห์ความถนัดรูปแบบกราฟ" className="bg-primary-2" Icon={ChartBar}/>
                <MemoNavigatorCard title="วิเคราะห์ความถนัดรูปแบบง่าย" className="bg-secondary-2" Icon={ChartDonut}/>
                <MemoNavigatorCard title="งานที่น่าชื่นชม" className="bg-secondary-3" Icon={CheckFat}/>
            </View>        
          </MemoCard>
      </BrandingBackground>
    );
  }