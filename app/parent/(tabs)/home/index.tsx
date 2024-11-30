import BrandingBackground from "@/components/background/branding-background"
import MemoCard from "@/components/container/memo-card"
import MemoNavigatorCard from "@/components/container/memo-navigator-card"
import ParentManDefaultSvg from "@/components/ui/icons/parent/man/default-svg"
import ParentWomanDefaultSvg from "@/components/ui/icons/parent/woman/default-svg"
import { useStudentById } from "@/hooks/useUser"
import { useParentToken } from "@/hooks/useUserToken"
import { isMan } from "@/shared/utils/gender-util"
import { useLocalSearchParams } from "expo-router"
import { ChartDonut, CheckFat, User } from "phosphor-react-native"
import { Text, View } from "react-native"

export default function ParentHomeScreen() {
    const { studentId } = useLocalSearchParams()
    const { data: parent, isLoading } = useParentToken()
    const { data } = useStudentById(studentId as string ?? "")
    const student = data?.data?.student
    
    function handleAptitude() {
        // router.push("/student/aptitude/overall")
    }
    const name = `ผู้ปกครอง ${parent?.firstName} ${parent?.lastName}`
    const classroom = `คุณกำลังดูข้อมูลของ ${student?.firstName ?? ""} ${student?.lastName ?? ""}`

    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" className="gap-y-3xl">
                <View className="flex-row justify-between items-center">
                    <View className="gap-y-sm">
                        <Text className="font-kanit-bold text-title text-body-1">สวัสดี</Text>
                        <Text className="font-kanit-medium text-body text-body-1">{name}</Text>
                        <Text className="font-kanit-regular text-caption-1 text-body-1">{classroom}</Text>
                    </View>
                    {!isLoading && isMan(parent?.gender ?? "") ? <ParentManDefaultSvg size={75}/> : <ParentWomanDefaultSvg size={75}/> }
                </View>
                <View className="gap-y-lg">
                    <MemoNavigatorCard title="ความสามารถที่โดดเด่น" className="bg-primary-2" Icon={ChartDonut} onPress={handleAptitude} />
                    <MemoNavigatorCard title="บุคลิกของคุณ" className="bg-secondary-2" Icon={User} />
                    <MemoNavigatorCard title="เหรียญและถ้วยรางวัล" className="bg-secondary-3" Icon={CheckFat} />
                </View>
            </MemoCard>
        </BrandingBackground>
    )
}