import BrandingBackground from "@/components/background/branding-background"
import MemoCard from "@/components/container/memo-card"
import MemoNavigatorCard from "@/components/container/memo-navigator-card"
import ParentManDefaultSvg from "@/components/ui/icons/parent/man/default-svg"
import ParentWomanDefaultSvg from "@/components/ui/icons/parent/woman/default-svg"
import StudentBoyDefaultSvg from "@/components/ui/icons/student/boy/default-svg"
import StudentGirlDefaultSvg from "@/components/ui/icons/student/girl/default-svg"
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
    const name = `คุณ ${parent?.firstName} ${parent?.lastName}`
    const classroom = `ดูข้อมูลของ ${student?.firstName ?? ""} ${student?.lastName ?? ""}`

    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" className="gap-y-3xl">
                <View className="flex-row justify-between items-center">
                    <View className="pl-sm gap-y-sm">
                        <Text className="font-kanit-bold text-title text-body-1">สวัสดีผู้ปกครอง</Text>
                        <Text className="font-kanit-medium text-body text-body-1">{name}</Text>
                        <Text className="font-kanit-regular text-caption-1 text-body-1">{classroom}</Text>
                    </View>
                    <View className="flex-row items-end">
                        {!isLoading && isMan(parent?.gender ?? "") ? <ParentManDefaultSvg size={80}/> : <ParentWomanDefaultSvg size={80}/> }
                        {!isLoading && isMan(student?.gender ?? "") ? <StudentBoyDefaultSvg size={50}/> : <StudentGirlDefaultSvg size={50}/> }
                    </View>
                </View>
                <View className="gap-y-lg">
                    <MemoNavigatorCard disabled title="ความสามารถที่โดดเด่น" className="bg-primary-2" Icon={ChartDonut} onPress={handleAptitude} />
                    <MemoNavigatorCard disabled title="บุคลิกของบุตรหลาน" className="bg-secondary-2" Icon={User} />
                    <MemoNavigatorCard disabled title="เหรียญและถ้วยรางวัล" className="bg-secondary-3" Icon={CheckFat} />
                </View>
            </MemoCard>
        </BrandingBackground>
    )
}