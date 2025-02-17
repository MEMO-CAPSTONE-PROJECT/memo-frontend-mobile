import MemoTreeLevel from "@/components/aptitude/memo-tree-level";
import BrandingBackground from "@/components/background/branding-background";
import MemoProgressbar from "@/components/bar/memo-progressbar";
import MemoBaseNavigatorCard from "@/components/container/base/memo-base-navigator-card";
import MemoCard from "@/components/container/memo-card";
import ScrollableView from "@/components/scrollable/scrollable-view";
import DirtSvg from "@/components/ui/icons/milestone/dirt-svg";
import { Color } from "@/constants/theme/color";
import { useGetAptitudesQuery } from "@/hooks/query/useAptitudeQuery";
import { useStudentByIdQuery } from "@/hooks/query/useUserQuery";
import { useStudentToken } from "@/hooks/useUserToken";
import { calculateSpendingPoint, TREE_MAX_LEVEL } from "@/shared/utils/tree-level-util";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function StudentAptitudeMilestoneScreen() {
    const { data: token } = useStudentToken()
    const { data: rawAptitudes, refetch: refetchAptitudes } = useGetAptitudesQuery()
    const { data: rawStudent, refetch: refetchStudentById } = useStudentByIdQuery(token?.sub as string)
    const student = rawStudent?.data?.student
    const aptitudes = rawAptitudes?.data?.aptitudes ?? []

    // Calculate student points
    const studentPoints = student?.points?.reduce((prev, curr) => {
        const { type, point, spending, color } = curr
        prev[type] = prev[type] ?? 0
        prev[type] = {
            point: point,
            spending: spending,
            color: color
        }
        return prev
    }, {} as { [key: string]: { point: number, spending: number, color: string } })

    const handleRefresh = () => {
        refetchAptitudes()
        refetchStudentById()
    }

    const handleNavigate = (id: string, type: string, color: string) => {
        router.push({
            pathname: `/student/(tabs)/aptitude/milestone/[id]`,
            params: { id: id, type: type, color: color }
        })
    }

    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" className="gap-y-3xl !p-0">
                <View className="flex-col w-full h-full gap-y-xl">
                    <View className="gap-y-xl px-[1.5rem]">
                        <View className="gap-y-sm">
                            <Text className="font-kanit-bold text-title text-title-1">ต้นไม้ของฉัน</Text>
                            <Text className="font-kanit-regular text-caption-1 text-body-2">ทำกิจกรรมความถนัดประเภทต่างๆเพื่อเพิ่มการเจริญเติบโต</Text>
                        </View>
                    </View>
                    <ScrollableView border={false} onRefresh={handleRefresh}>
                        <View className="flex-col w-full h-full gap-y-xl px-[1.5rem]">
                            {aptitudes?.map(({ id, type, color: mockColor }) => {
                                const findPoints = studentPoints?.[type]
                                let points = findPoints
                                if (!points) points = { color: mockColor, point: 0, spending: 0 }
                                const { color, spending } = points
                                const { level, needPointToNextLevel, maxPoint } = calculateSpendingPoint(spending)
            
                                return <MemoBaseNavigatorCard key={id} className="gap-x-lg" onPress={() => handleNavigate(id, type, color)}>
                                    <View
                                        className={`bg-system-light-blue w-[100] h-[100] rounded-xsm flex-col items-center overflow-hidden ${level >= TREE_MAX_LEVEL ? "justify-center" : "justify-end"}`}
                                    >
                                        <MemoTreeLevel id={id} color={color} level={level} divide={1.75}/>
                                        <DirtSvg width={50} height={10} />
                                    </View>
                                    <View className="flex-1 flex-col gap-y-md">
                                        <View className="flex-col">
                                            <Text className="font-kanit-bold text-body text-body-1">{type} เลเวล {level}</Text>
                                            <Text className="font-kanit-regular text-caption-1 text-body-2">ทำกิจกรรมด้าน{type}เพื่อเพิ่มการเจริญเติบโต</Text>
                                        </View>
                                        <MemoProgressbar fillColor={Color["system-blue-2"]} progress={maxPoint ? (needPointToNextLevel / maxPoint) * 100 : 100} />
                                    </View>
                                </MemoBaseNavigatorCard>
                            }) ?? <Text className="font-kanit-bold text-body text-body-1">ไม่มีสามารถโหลดข้อมูลได้</Text>}
                        </View>
                    </ScrollableView>
                </View>
            </MemoCard>
        </BrandingBackground>
    )
}