import BrandingBackground from "@/components/background/branding-background";
import MemoNavigatorCard from "@/components/container/base/list/memo-navigator-card";
import MemoCard from "@/components/container/memo-card";
import TeacherManDefaultSvg from "@/components/ui/icons/teacher/man/default-svg";
import TeacherWomanDefaultSvg from "@/components/ui/icons/teacher/woman/default-svg";
import { useTeacherToken } from "@/hooks/useUserToken";
import { isMan } from "@/shared/utils/gender-util";
import { ChartDonut } from "phosphor-react-native";
import { Text, View } from "react-native";

export default function TeacherAnalysisScreen() {
    const { data: teacher, isLoading } = useTeacherToken()
    const name = `คุณครู ${teacher?.firstName} ${teacher?.lastName}`
    const classroom = `ตำแหน่ง ${teacher?.position}`
    return (
      <BrandingBackground variant="secondary">
          <MemoCard size="full" className="gap-y-3xl">
            <View className="flex-row justify-between items-center">
                <View className="gap-y-sm">
                    <Text className="font-kanit-bold text-title text-title-1">ยินดีต้อนรับ</Text>
                    <Text className="font-kanit-medium text-body text-body-1">{name}</Text>
                    <Text className="font-kanit-regular text-caption-1 text-body-2">{classroom}</Text>
                </View>
                {!isLoading && isMan(teacher?.gender ?? "") ? <TeacherManDefaultSvg size={80}/> : <TeacherWomanDefaultSvg size={80}/>}
            </View>    
            <View className="gap-y-lg">
                <MemoNavigatorCard disabled title="วิเคราห์เป้าหมายที่จัดขึ้น" className="bg-primary-2" Icon={ChartDonut}/>
            </View>        
          </MemoCard>
      </BrandingBackground>
    )
}