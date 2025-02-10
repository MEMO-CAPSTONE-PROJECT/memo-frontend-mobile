import BrandingBackground from "@/components/background/branding-background";
import MemoProgressbar from "@/components/bar/memo-progressbar";
import MemoBaseNavigatorCard from "@/components/container/base/memo-base-navigator-card";
import MemoCard from "@/components/container/memo-card";
import ScrollableView from "@/components/scrollable/scrollable-view";
import DirtSvg from "@/components/ui/icons/milestone/dirt-svg";
import MilestoneTreeStageFourSvg from "@/components/ui/icons/milestone/tree/stage-four-svg";
import MilestoneTreeStageOneSvg from "@/components/ui/icons/milestone/tree/stage-one-svg";
import MilestoneTreeStageThreeSvg from "@/components/ui/icons/milestone/tree/stage-three-svg";
import MilestoneTreeStageTwoSvg from "@/components/ui/icons/milestone/tree/stage-two-svg";
import { AptitudeType } from "@/constants/aptitude-type";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function StudentAptitudeMilestoneScreen() {
    const handleRefresh = () => {
        console.log("refresh")
    }

    const getRandomStage = () => {
        const random = Math.random()
        if (random > 0.66) return <MilestoneTreeStageFourSvg size={165}/>
        if (random > 0.33) return <MilestoneTreeStageThreeSvg size={106}/>
        if (random > 0.16) return <MilestoneTreeStageTwoSvg size={55}/>
        return <MilestoneTreeStageOneSvg size={50}/>
    }

    const handleNavigate = (id: string) => {
        router.push(`/student/aptitude/milestone/${id}`)
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
                            {Object.keys(AptitudeType).map((type) => (
                                <MemoBaseNavigatorCard key={type} className="gap-x-lg" onPress={() => handleNavigate(type)}>
                                    <View className={`bg-system-light-blue w-[100] h-[100] rounded-xsm flex-col justify-end items-center overflow-hidden`}>
                                        {getRandomStage()}
                                        <DirtSvg width={50} height={10}/>
                                    </View>
                                    <View className="flex-1 flex-col gap-y-md">
                                        <View className="flex-col">
                                            <Text className="font-kanit-bold text-body text-body-1">{type} เลเวล 1</Text>
                                            <Text className="font-kanit-regular text-caption-1 text-body-2">ทำกิจกรรมด้าน{type}เพื่อเพิ่มการเจริญเติบโต</Text>
                                        </View>
                                        <MemoProgressbar progress={25}/>
                                    </View>
                                </MemoBaseNavigatorCard>
                            ))}
                            
                        </View>
                    </ScrollableView>
                </View>
            </MemoCard>
        </BrandingBackground>
    )
}