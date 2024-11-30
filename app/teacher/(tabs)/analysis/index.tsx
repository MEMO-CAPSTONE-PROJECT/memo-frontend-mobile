import BrandingBackground from "@/components/background/branding-background";
import MemoCard from "@/components/container/memo-card";
import MemoNavigatorCard from "@/components/container/memo-navigator-card";
import TeacherManDefaultSvg from "@/components/ui/icons/teacher/man/default-svg";
import TeacherWomanDefaultSvg from "@/components/ui/icons/teacher/woman/default-svg";
import { useTeacherToken } from "@/hooks/useUserToken";
import { isMan } from "@/shared/utils/gender-util";
import { ChartDonut } from "phosphor-react-native";
import { Text, View } from "react-native";

export default function TeacherAnalysisScreen() {
    const { data: teacher, isLoading } = useTeacherToken()
    const name = `คุณครู ${teacher?.firstName} ${teacher?.lastName}`
    const classroom = `ชั้นประถมศึกษาปีที่ 4/2`
    return (
      <BrandingBackground variant="secondary">
          <MemoCard size="full" className="gap-y-3xl">
            <View className="flex-row justify-between items-center">
                <View className="gap-y-sm">
                    <Text className="font-kanit-bold text-title text-body-1">สวัสดี</Text>
                    <Text className="font-kanit-medium text-body text-body-1">{name}</Text>
                    <Text className="font-kanit-regular text-caption-1 text-body-2">{classroom}</Text>
                </View>
                {!isLoading && isMan(teacher?.gender ?? "") ? <TeacherManDefaultSvg size={75}/> : <TeacherWomanDefaultSvg size={75}/>}
            </View>    
            <View className="gap-y-lg">
                <MemoNavigatorCard title="วิเคราห์เป้าหมายที่จัดขึ้น" className="bg-primary-2" Icon={ChartDonut}/>
            </View>        
          </MemoCard>
      </BrandingBackground>
    )
}