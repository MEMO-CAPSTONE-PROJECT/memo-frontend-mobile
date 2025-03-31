import BrandingBackground from "@/components/background/branding-background";
import MemoBaseNavigatorCard from "@/components/container/base/memo-base-navigator-card";
import MemoCard from "@/components/container/memo-card";
import MemoPill from "@/components/pill/memo-pill";
import ScrollableView from "@/components/scrollable/scrollable-view";
import CharacterBackgroundSvg from "@/components/ui/icons/character-background-svg";
import MemoStudentCharacterBottomSheet from "@/components/ui/kits/sheet/memo-character-bottom-sheet";
import StudentCharacter from "@/components/ui/kits/student-character";
import { AptitudeColorValues } from "@/constants/aptitude-color";
import { AptitudeType } from "@/constants/aptitude-type";
import { Color } from "@/constants/theme/color";
import { useStreamContext } from "@/context/useAIStream";
import { useHistoryMainQuery, useHistoryPromptQuery } from "@/hooks/query/useHistoryAnalysisQuery";
import { useStudentByIdQuery } from "@/hooks/query/useUserQuery";
import { getAptitudeColor } from "@/shared/utils/aptitude-util";
import { useLocalSearchParams } from "expo-router";
import { ArrowCounterClockwise } from "phosphor-react-native";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Spinner } from "tamagui";

// Default prompts as constants
const DEFAULT_PROMPTS = {
    tags: "ขอภาษาไทย hashtag 2 คำ สำหรับคนชอบทำกิจกรรมจิตอาสา",
    strengths: "คนชอบทำกิจกรรมจิตอาสามีจุดแข็งอย่างไร ไม่เกิน 12 คำ",
    weakness: "คนชอบทำกิจกรรมจิตอาสามีจุดอ่อนอย่างไร ไม่เกิน 12 คำ",
    personality: "ลักษณะนิสัยของคนมีจิตอาสาเป็นอย่างไร ไม่เกิน 20 คำ",
    support: "ข้อเสนอแนะแก่ผู้ปกครองของคนมีจิตอาสาเป็นอย่างไร สรุปให้สั้นและเข้าใจ เป็น bullet point 3 ข้อ"
};

// Loading state component
const LoadingOrErrorState = ({ isLoading, isError, content }: { isLoading: boolean; isError: boolean; content: string | undefined }) => {
    if (isLoading) return <Spinner color={Color["title-1"]} />;
    if (isError) return <Text>มีปัญหาในการรับข้อมูล</Text>;
    return <Text className="font-kanit-medium">{content ?? "ไม่สามารถอ่านข้อมูลได้"}</Text>;
};

// TagsSection component for the hashtags display
const TagsSection = ({ isLoading, isError, content, color }: { 
    isLoading: boolean; 
    isError: boolean; 
    content: string | undefined; 
    color: AptitudeColorValues | undefined 
}) => {
    if (isLoading) {
        return <MemoPill name={"กำลังโหลด..."} textColor={color?.color} borderColor={color?.color} backgroundColor={color?.light} />;
    }
    
    if (isError) {
        return <MemoPill name={"มีปัญหาในการรับข้อมูล"} textColor={color?.color} borderColor={color?.color} backgroundColor={color?.light} />;
    }
    
    return content?.split(" ")?.map((word, index) => (
        <MemoPill 
            key={index} 
            name={word} 
            textColor={color?.color} 
            borderColor={color?.color} 
            backgroundColor={color?.light} 
        />
    )) || <Text>ไม่สามารถอ่านข้อมูลได้</Text>;
};

export default function ParentCharacterScreen() {
    const { startStream, refetchMessage, isMessageLoading, isMessageError, getMessageById } = useStreamContext();
    const { studentId } = useLocalSearchParams();
    const studentIdString = studentId as string ?? "";
    
    // Data fetching
    const { data: rawHistoryPrompt, refetch } = useHistoryPromptQuery(studentIdString);
    const { data: rawHistoryMain } = useHistoryMainQuery(studentIdString);
    const { data: rawStudent } = useStudentByIdQuery(studentIdString);

    // Process data
    const student = rawStudent?.data?.student;
    const historyMain = rawHistoryMain?.data?.result ?? { 
        type: "ความเป็นผู้นำ", 
        totalScore: 0, 
        count: 0 
    };
    
    const gender = student?.gender ?? "male";
    const name = student?.firstName ?? "ดวงเจริญ";
    const aptitude = historyMain.type;
    const color = getAptitudeColor(AptitudeType[aptitude]);

    // Start streaming data
    useEffect(() => { 
        const historyPrompt = rawHistoryPrompt?.data?.messages;
        if (!historyPrompt) return;
        
        startStream("tags", historyPrompt?.tag ?? DEFAULT_PROMPTS.tags)
        startStream("strengths", historyPrompt?.strengths ?? DEFAULT_PROMPTS.strengths)
        startStream("weakness", historyPrompt?.weakness ?? DEFAULT_PROMPTS.weakness)
        startStream("personality", historyPrompt?.personality ?? DEFAULT_PROMPTS.personality)
        startStream("support", historyPrompt?.support ?? DEFAULT_PROMPTS.support)
    }, [rawHistoryPrompt, startStream]);
    
    function refetchMessages() {
        refetch()
        const historyPrompt = rawHistoryPrompt?.data?.messages;
        if (!historyPrompt) return;

        refetchMessage("tags", historyPrompt?.tag ?? DEFAULT_PROMPTS.tags)
        refetchMessage("strengths", historyPrompt?.strengths ?? DEFAULT_PROMPTS.strengths)
        refetchMessage("weakness", historyPrompt?.weakness ?? DEFAULT_PROMPTS.weakness)
        refetchMessage("personality", historyPrompt?.personality ?? DEFAULT_PROMPTS.personality)
        refetchMessage("support", historyPrompt?.support ?? DEFAULT_PROMPTS.support)
    }

    return (
        <BrandingBackground>
            <MemoCard size="full" className="!p-0 !pt-0">
                <ScrollableView border={false} className="pt-[1.5rem] p-[1.5rem] gap-y-lg">
                    {/* Header section */}
                    <View className="flex-col items-center">
                        <View className="flex-row gap-x-sm items-center">
                            <Text className="font-kanit-bold text-title-1 text-title">
                                {name} มีบุคลิกหลักเป็น
                            </Text>
                            <MemoStudentCharacterBottomSheet gender={gender}/>
                        </View>
                        <Text 
                            className="font-kanit-bold text-title" 
                            style={{ color: color?.color }}
                        >
                            {aptitude}
                        </Text>
                    </View>

                    {/* Character avatar section */}
                    <View className="flex w-full h-[200] flex-row justify-center items-center">
                        <View className="h-full justify-between items-end">
                            <View 
                                className="w-[50] h-[50] rounded-circle border-xl" 
                                style={{ borderColor: color?.background ?? Color["system-light-purple"] }}
                            />
                            <View 
                                className="w-[16] h-[16] rounded-circle border-lg" 
                                style={{ borderColor: color?.background ?? Color["system-light-purple"] }}
                            />
                        </View>
                        <View className="overflow-hidden w-[200] h-[200] rounded-circle">
                            <View className="absolute">
                                <CharacterBackgroundSvg color={color?.background ?? Color["system-light-blue"]} />
                            </View>
                            <View className="scale-[0.85]">
                                <StudentCharacter 
                                    gender={gender} 
                                    aptitude={aptitude} 
                                    aptitudeColor={color?.color ?? Color["primary-2"]} 
                                    aptitudeColor2={color?.light ?? Color["system-light-purple"]}
                                />
                            </View>
                        </View>
                        <View className="h-full justify-end">
                            <View 
                                className="w-[20] h-[20] rounded-circle border-lg" 
                                style={{ borderColor: color?.background ?? Color["system-light-purple"] }}
                            />
                        </View>
                    </View>

                    {/* Analysis section */}
                    <View className="gap-y-lg">
                        {/* Tags section */}
                        <View className="flex-col gap-y-sm items-center">
                            <View className="flex-row gap-x-sm">
                                <Text className="font-kanit-bold text-body text-title-1 text-center">
                                    ผลการวิเคราะห์ภาพรวม 
                                </Text>
                                <TouchableOpacity 
                                    className="flex-row items-center gap-x-sm justify-center rounded-circle bg-system-blue pl-md px-sm" 
                                    onPress={refetchMessages}
                                >
                                    <Text className="font-kanit-medium text-system-white">วิเคราะห์อีกครั้ง</Text>
                                    <ArrowCounterClockwise color={Color["system-white"]} size={16} weight="bold" />
                                </TouchableOpacity>
                            </View>
                            <View className="flex-row justify-center items-center gap-x-lg">
                                <TagsSection
                                    isLoading={isMessageLoading("tags")}
                                    isError={isMessageError("tags")}
                                    content={getMessageById("tags")?.text}
                                    color={color}
                                />
                            </View>
                        </View>

                        {/* Strengths and Weaknesses section */}
                        <View className="flex-row gap-x-lg">
                            <View className="flex-1 bg-system-success-light-2 rounded-sm p-lg gap-y-xsm">
                                <Text className="font-kanit-bold text-body text-grass-dark-green">
                                    จุดแข็ง
                                </Text>
                                <Text className="font-kanit-medium text-caption-1 text-title-1">
                                    <LoadingOrErrorState
                                        isLoading={isMessageLoading("strengths")}
                                        isError={isMessageError("strengths")}
                                        content={getMessageById("strengths")?.text}
                                    />
                                </Text>
                            </View>
                            <View className="flex-1 bg-system-error-light-2 rounded-sm p-lg gap-y-xsm">
                                <Text className="font-kanit-bold text-body text-system-error-2">
                                    จุดอ่อน
                                </Text>
                                <Text className="font-kanit-medium text-caption-1 text-title-1">
                                    <LoadingOrErrorState
                                        isLoading={isMessageLoading("weakness")}
                                        isError={isMessageError("weakness")}
                                        content={getMessageById("weakness")?.text}
                                    />
                                </Text>
                            </View>
                        </View>

                        {/* Personality section */}
                        <MemoBaseNavigatorCard className="flex-col !items-start gap-y-xsm" disabled disabledStyled={false}>
                            <Text className="font-kanit-bold text-body text-title-1 text-start">
                                ลักษณะนิสัย
                            </Text>
                            <Text className="font-kanit-medium text-body text-body-1">
                                <LoadingOrErrorState
                                    isLoading={isMessageLoading("personality")}
                                    isError={isMessageError("personality")}
                                    content={getMessageById("personality")?.text}
                                />
                            </Text>
                        </MemoBaseNavigatorCard>

                        {/* Support section */}
                        <MemoBaseNavigatorCard className="flex-col !items-start gap-y-xsm" disabled disabledStyled={false}>
                            <Text className="font-kanit-bold text-body text-title-1 text-start">
                                ข้อเสนอแนะแก่ผู้ปกครอง
                            </Text>
                            <Text className="font-kanit-medium text-body text-body-1">
                                <LoadingOrErrorState
                                    isLoading={isMessageLoading("support")}
                                    isError={isMessageError("support")}
                                    content={getMessageById("support")?.text}
                                />
                            </Text>
                        </MemoBaseNavigatorCard>
                    </View>
                </ScrollableView>
            </MemoCard>
        </BrandingBackground>
    );
}