import AnimatedCloud from "@/components/animated/animated-cloud";
import AnimatedDrop from "@/components/animated/icon/animated-drop";
import AnimatedWateringBucket from "@/components/animated/icon/animated-watering-bucket";
import MemoTreeLevel from "@/components/aptitude/memo-tree-level";
import BrandingBackground from "@/components/background/branding-background";
import SafeAreaAvoidingView from "@/components/background/safe-area-avoiding-view";
import MemoProgressbar from "@/components/bar/memo-progressbar";
import DirtIslandSvg from "@/components/ui/icons/milestone/island/dirt-island-svg";
import MilestoneTreeStageOneSvg from "@/components/ui/icons/milestone/tree/stage-one-svg";
import MascotGirlHappySvg from "@/components/ui/icons/student/girl/happy-svg";
import { Color } from "@/constants/theme/color";
import { useMilestoneSpendingMutation } from "@/hooks/mutation/useMilestoneMutation";
import { useStudentByIdQuery } from "@/hooks/query/useUserQuery";
import { useStudentToken } from "@/hooks/useUserToken";
import { PouringStatus } from "@/shared/types/milestone-type";
import { calculateSpendingPoint, getTreeLevel, isLevelReached, SPENDING_AMOUNT } from "@/shared/utils/tree-level-util";
import { AxiosError } from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { Drop, PlusCircle, Sparkle } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function MilestoneDetailScreen() {
    const { id, type, color } = useLocalSearchParams()
    const [pouring, setPouring] = useState<PouringStatus>("stop")
    const [point, setPoint] = useState({ point: 0, spending: 0 })

    const { data: token } = useStudentToken()
    const { data: rawStudent, refetch } = useStudentByIdQuery(token?.sub as string, !!token?.sub)
    const { mutateAsync: spendingMutation } = useMilestoneSpendingMutation()
    const student = rawStudent?.data?.student

    useEffect(() => {
        const studentPoint = student?.points?.find(p => p.type === type)
        if (studentPoint) {
            setPoint({
                point: studentPoint.point,
                spending: studentPoint.spending
            })
        }
    }, [student, type])

    const currentPoint = point.point - point.spending
    const { level, needPointToNextLevel, maxPoint } = calculateSpendingPoint(point.spending)

    const handleStartPouring = async () => {
        if (pouring !== "stop") return
        setPouring("start")
        Toast.hide()
        try {
            console.log("SPENDING " + type);        
            await spendingMutation({
                studentId: String(token?.sub as string),
                type: type as string,
                spending: "100"
            })
            refetch()
            showLevelUpToast(level + 1)
        } catch (error) {
            console.log((error as AxiosError)?.response?.data)
        }
    }

    const showLevelUpToast = (newLevel: number) => {
        if (!isLevelReached(point.spending)) return
        Toast.show({
            type: "normal",
            text1: "ยินดีด้วย",
            text2: `ต้นไม้ของคุณเติบโตเป็นเลเวล ${newLevel}`,
            position: "top",
            bottomOffset: 120,
            onPress: () => Toast.hide(),
            props: {
                icon: (
                    <View>
                        <MascotGirlHappySvg size={50} />
                        <View className="absolute -top-2 -right-4">
                            <Sparkle color={Color["secondary-2"]} weight="fill" />
                        </View>
                    </View>
                )
            }
        });
    }

    const handlePourSuccess = () => {
        if (pouring === "pouring") return; // Avoid redundant resets
        setPouring("pouring")
        setTimeout(() => {
            setPouring("stop")
        }, 1500)
    }

    const handleAddPoint = () => {
        router.push("/student/(tabs)/home/")
    }

    return (
        <BrandingBackground variant="secondary">
            <SafeAreaAvoidingView>
                <View className="flex-col w-full h-full">
                    <View className="flex-1 flex-col bg-system-light-blue">
                        <View className="mt-[60] h-1/2">
                            <AnimatedCloud startPosition={-500} endPosition={1000} duration={5000} />
                            <AnimatedCloud startPosition={-1000} endPosition={2000} duration={10000} />
                            <AnimatedCloud startPosition={-1500} endPosition={3000} duration={15000} />
                        </View>
                        {/* Tree island */}
                        <View className="absolute h-full w-full bottom-0 items-center justify-end">
                            <View className="absolute pb-6"><DirtIslandSvg width={200} height={100} /></View>
                            <View className="absolute pb-24"><MemoTreeLevel id={id as string} color={color as string} level={level}/></View>
                        </View>
                        {/* Tree level indicator*/}
                        <View className="absolute p-sm px-md flex-row justify-between items-center top-6 left-4 gap-x-sm w-fit h-fit bg-system-dark-brown rounded-circle">
                            <MilestoneTreeStageOneSvg size={25} />
                            <Text className="text-system-white font-kanit-bold">
                                เลเวล  <Text className="text-secondary-2">{getTreeLevel(point.spending)}</Text>
                            </Text>
                        </View>
                        {/* Points indicator */}
                        <View className="absolute p-sm px-md flex-row justify-between items-center top-6 right-4 gap-x-sm w-fit h-fit bg-system-white rounded-circle">
                            <Drop color={Color["system-blue-2"]} weight="fill" size={25} />
                            <Text className="text-title-1 font-kanit-bold">{currentPoint}</Text>
                            <TouchableOpacity onPress={handleAddPoint}>
                                <PlusCircle weight="fill" color={Color["primary-2"]} />
                            </TouchableOpacity>
                        </View>
                        {/* Watering Bucket */}
                        {<AnimatedPouring pouring={pouring} onPouringSuccess={handlePourSuccess} />}
                    </View>
                    <View className="items-center h-[100] w-full bg-system-white flex-row p-xl gap-x-xl">
                        <View className="flex-1 flex-col gap-y-md">
                            <View className="flex-row justify-between">
                                <Text className="font-kanit-medium text-body-2">ปริมาณน้ำที่ต้องรด</Text>
                                <Text className="font-kanit-medium text-body-2">{needPointToNextLevel}/{maxPoint ?? "∞"}</Text>
                            </View>
                            <MemoProgressbar fillColor={Color["system-blue-2"]} progress={maxPoint ? (needPointToNextLevel / maxPoint) * 100 : 100} />
                        </View>
                        <TouchableOpacity 
                            disabled={currentPoint < SPENDING_AMOUNT}
                            onPress={handleStartPouring} 
                            className={`rounded-xsm bg-primary-2 h-full aspect-square justify-center items-center ${currentPoint < SPENDING_AMOUNT ? "opacity-50" : ""}`}
                        >
                            <Drop color={Color["system-white"]} weight="fill" size={25} />
                            <Text className="font-kanit-medium text-system-white">- {SPENDING_AMOUNT}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaAvoidingView>
        </BrandingBackground>
    )
}

function AnimatedPouring({ pouring, onPouringSuccess }: Readonly<{ 
    pouring: PouringStatus, 
    onPouringSuccess: () => void 
}>) {
    if (pouring === "stop") return null
    return (
        <View className="absolute w-full h-full items-center justify-center ">
            {/* watering bucket */}
            <View className="absolute w-full h-full items-center justify-center pl-36">
                <AnimatedWateringBucket pouring={pouring} onSuccess={onPouringSuccess} />
            </View>
            {/* water drops */}
            {pouring === "pouring" && (
                <View className="absolute w-full gap-lg items-center justify-center pt-44">
                    {[...Array(3)].map((_, rowIndex) => (
                        <View key={"drop_" + rowIndex} className="flex-row gap-md">
                            {[...Array(2)].map((_, colIndex) => (
                                <AnimatedDrop
                                    key={`${rowIndex}-${colIndex}`}
                                    rowIndex={rowIndex}
                                    colIndex={colIndex}
                                    pouring={pouring}
                                />
                            ))}
                        </View>
                    ))}
                </View>)
            }
        </View>
    )
}