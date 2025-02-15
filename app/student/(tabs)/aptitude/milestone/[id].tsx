import AnimatedCloud from "@/components/animated/animated-cloud";
import MemoTreeLevel from "@/components/aptitude/memo-tree-level";
import BrandingBackground from "@/components/background/branding-background";
import SafeAreaAvoidingView from "@/components/background/safe-area-avoiding-view";
import MemoProgressbar from "@/components/bar/memo-progressbar";
import DirtIslandSvg from "@/components/ui/icons/milestone/island/dirt-island-svg";
import MilestoneTreeStageOneSvg from "@/components/ui/icons/milestone/tree/stage-one-svg";
import WateringBucketSvg from "@/components/ui/icons/milestone/watering-bucket-svg";
import MascotGirlHappySvg from "@/components/ui/icons/student/girl/happy-svg";
import { Color } from "@/constants/theme/color";
import { useMilestoneSpendingMutation } from "@/hooks/mutation/useMilestoneMutation";
import { useStudentByIdQuery } from "@/hooks/query/useUserQuery";
import { useStudentToken } from "@/hooks/useUserToken";
import { calculateSpendingPoint, getTreeLevel, isLevelReached, SPENDING_AMOUNT } from "@/shared/utils/tree-level-util";
import { AxiosError } from "axios";
import { useLocalSearchParams } from "expo-router";
import { Drop, PlusCircle, Sparkle } from "phosphor-react-native";
import { memo, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { Easing, FadeIn, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import Toast from "react-native-toast-message";

const AnimatedDrop = ({ rowIndex, colIndex, pouring }: { rowIndex: number; colIndex: number, pouring: PouringStatus }) => {
    const translateY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(0);

    useEffect(() => {
        const repeater = (sequence: number) => {
            return withRepeat(
                withDelay((rowIndex * 3 + colIndex) * 200, sequence), 1
            )
        }

        // Initiate the animation for drops once `isPouring` is true
        translateY.value = repeater(withSequence(
            withTiming(-50, { duration: 0 }), // Start slightly above
            withTiming(150, { duration: 2000, easing: Easing.inOut(Easing.quad) }), // Fall smoothly
            withTiming(150, { duration: 300 }) // Small pause at bottom before disappearing
        ))

        translateX.value = repeater(
            withSequence(
                withTiming(0),
                withTiming(colIndex % 2 ? 10 : -10, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
                withTiming(0, { duration: 0 })
            )
        )
        opacity.value = withSequence(
            withTiming(0, { duration: 300 }), // Fade in
            withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.quad) }), // Maintain opacity during fall
            withTiming(1, { duration: 300 }) // Fade out after the fall
        )

    }, [colIndex, rowIndex, opacity, translateY, translateX, pouring]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            { translateX: translateX.value },
        ],
        opacity: opacity.value,
    }));

    return (
        <Animated.View 
            style={animatedStyle}
        >
            <Drop color={Color["system-blue-2"]} weight="fill" size={16} />
        </Animated.View>
    )
}

const AnimatedWateringBucket = ({ pouring, onSuccess }: { pouring: PouringStatus, onSuccess?: () => void }) => {
    const rotate = useSharedValue(0); 

    useEffect(() => {
        rotate.value = 0; // Reset before animation starts

        rotate.value = withDelay(
            300,
            withTiming(-45, {
              duration: 500,
              easing: Easing.inOut(Easing.quad),
            }, () => {
              if (onSuccess) runOnJS(onSuccess)();
            })
        );
    }, [pouring, rotate, onSuccess]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value}deg` }]
    }));

    return (
        <Animated.View 
            entering={FadeIn.duration(500)}
            style={animatedStyle}
        >
            <WateringBucketSvg size={100} />
        </Animated.View>
    )
}

const AnimatedWateringBucketMemo = memo(AnimatedWateringBucket)
const AnimatedDropMemo = memo(AnimatedDrop)

type PouringStatus = "stop" | "start" | "pouring"

export default function MilestoneDetailScreen() {
    const { id, type, color } = useLocalSearchParams()
    const [pouring, setPouring] = useState<PouringStatus>("stop")
    const [point, setPoint] = useState({ point: 0, spending: 0 })

    const { data: token } = useStudentToken()
    const { data: rawStudent, refetch } = useStudentByIdQuery(token?.sub as string, !!token?.sub)
    const { mutateAsync: spendingMutation } = useMilestoneSpendingMutation()
    const student = rawStudent?.data?.student

    useEffect(() => {
        for (const point of student?.points ?? []) {
            if (point.type === type) 
                setPoint({
                    point: point.point,
                    spending: point.spending
                })
        }
    }, [student, type])
    const currentPoint = point.point - point.spending
    const { level, needPointToNextLevel, maxPoint } = calculateSpendingPoint(point.spending)

    const handleStartPouring = async () => {
        if (pouring !== "stop") return
        Toast.hide()
        setPouring("start")
        try {
            console.log("SPENDING " + type);
            
            const result = await spendingMutation({
                studentId: String(token?.sub as string),
                type: type as string,
                spending: "100"
            })
            
            if (result) {
                refetch()
                
                if (isLevelReached(point.spending)) {
                    Toast.show({
                        type: "normal",
                        text1: 'ยินดีด้วย',
                        text2: `ต้นไม้ของคุณเติบโตเป็นเลเวล ${level+1}`,
                        position: "top",
                        bottomOffset: 120,
                        onPress: () => Toast.hide(),
                        props: {
                            icon: (
                                <View>
                                    <MascotGirlHappySvg size={50} />
                                    <View className="absolute -top-2 -right-4"><Sparkle color={Color["secondary-2"]} weight="fill" /></View>
                                </View>
                            )
                        }
                    })
                }  
            }
        } catch (error) {
            console.log((error as AxiosError)?.response?.data)
        }
    }

    const handlePourSuccess = () => {
        if (pouring === "pouring") return; // Avoid redundant resets
        setPouring("pouring")
        setTimeout(() => {
            setPouring("stop")
        }, 2000)
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
                        <View className="absolute h-full w-full bottom-0 items-center justify-end">
                            <View className="absolute pb-6"><DirtIslandSvg width={200} height={100} /></View>
                            <View className="absolute pb-24">
                                <MemoTreeLevel id={id as string} color={color as string} level={level}/>
                            </View>
                        </View>
                        {/* Tree level */}
                        <View className="absolute p-sm px-md flex-row justify-between items-center top-6 left-4 gap-x-sm w-[100] h-fit bg-system-dark-brown rounded-circle">
                            <MilestoneTreeStageOneSvg size={25} />
                            <Text className="text-system-white font-kanit-bold">
                                เลเวล  <Text className="text-secondary-2">{getTreeLevel(point.spending)}</Text>
                            </Text>
                        </View>
                        {/* Points */}
                        <View className="absolute p-sm px-md flex-row justify-between items-center top-6 right-4 gap-x-sm w-fit h-fit bg-system-white rounded-circle">
                            <Drop color={Color["system-blue-2"]} weight="fill" size={25} />
                            <Text className="text-title-1 font-kanit-bold">{currentPoint}</Text>
                            <TouchableOpacity>
                                <PlusCircle weight="fill" color={Color["primary-2"]} />
                            </TouchableOpacity>
                        </View>
                        {/* Watering Bucket */}
                        {pouring !== "stop" &&
                            <View className="absolute w-full h-full items-center justify-center ">
                                <View className="absolute w-full h-full items-center justify-center pl-36">
                                    <AnimatedWateringBucketMemo pouring={pouring} onSuccess={handlePourSuccess} />
                                </View>
                                {pouring === "pouring" && (
                                    <View className="absolute w-full gap-lg items-center justify-center pt-44">
                                        {[...Array(3)].map((_, rowIndex) => (
                                            <View key={"drop_" + rowIndex} className="flex-row gap-md">
                                                {[...Array(2)].map((_, colIndex) => (
                                                    <AnimatedDropMemo
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
                        }
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