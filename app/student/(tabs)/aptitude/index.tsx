import BrandingBackground from "@/components/background/branding-background";
import MemoCard from "@/components/container/memo-card";
import MemoNavigatorCard from "@/components/container/memo-navigator-card";
import MedalSvg from "@/components/ui/icons/medal-svg";
import StudentBoyDefaultSvg from "@/components/ui/icons/student/boy/default-svg";
import StudentGirlDefaultSvg from "@/components/ui/icons/student/girl/default-svg";
import { useStudentById } from "@/hooks/useUser";
import { useStudentToken } from "@/hooks/useUserToken";
import { isMan } from "@/shared/utils/gender-util";
import { useRouter } from "expo-router";
import { ChartDonut, CheckFat, User } from "phosphor-react-native";
import { Text, View } from "react-native";

export default function StudentAptitudeScreen() {
    const { data: token } = useStudentToken()
    const { data } = useStudentById(token?.sub ?? "")
    const student = data?.data?.student
    const name = `${token?.firstName} ${token?.lastName}`
    const classroom = `ชั้นประถมศึกษาปีที่ ${student?.classLevel}/${student?.classRoom}`
    const router = useRouter()

    function handlePressChart() {
        router.navigate("/student/aptitude/overall")
    }

    return (
      <BrandingBackground variant="secondary">
          <MemoCard size="full" className="gap-y-3xl">
            <View className="flex-row justify-between items-center">
                <View className="gap-y-sm pl-sm">
                    <Text className="font-kanit-bold text-title text-body-1">สวัสดี</Text>
                    <Text className="font-kanit-medium text-body text-body-1">{name}</Text>
                    <Text className="font-kanit-regular text-caption-1 text-body-2">{classroom}</Text>
                </View>
                <View className="flex-row">
                    {isMan(token?.gender ?? "") ? <StudentBoyDefaultSvg size={90}/> : <StudentGirlDefaultSvg size={90}/>}
                    <MedalSvg size={48} className="-rotate-[22deg]"/>
                </View>
            </View>    
            <View className="gap-y-lg">
                <MemoNavigatorCard title="ความสามารถที่โดดเด่น" className="bg-primary-2" Icon={ChartDonut} onPress={handlePressChart}/>
                <MemoNavigatorCard title="บุคลิกของคุณ" className="bg-secondary-2" Icon={User} disabled/>
                <MemoNavigatorCard title="เหรียญและถ้วยรางวัล" className="bg-secondary-3" Icon={CheckFat} disabled/>
            </View>        
          </MemoCard>
      </BrandingBackground>
    );
}