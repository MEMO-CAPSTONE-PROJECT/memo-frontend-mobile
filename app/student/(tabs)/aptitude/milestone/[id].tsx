import AnimatedCloud from "@/components/animated/animated-cloud";
import BrandingBackground from "@/components/background/branding-background";
import SafeAreaAvoidingView from "@/components/background/safe-area-avoiding-view";
import DirtIslandSvg from "@/components/ui/icons/milestone/island/dirt-island-svg";
import SeedSvg from "@/components/ui/icons/milestone/tree/seed-svg";
import MilestoneTreeStageFourSvg from "@/components/ui/icons/milestone/tree/stage-four-svg";
import MilestoneTreeStageOneSvg from "@/components/ui/icons/milestone/tree/stage-one-svg";
import MilestoneTreeStageThreeSvg from "@/components/ui/icons/milestone/tree/stage-three-svg";
import MilestoneTreeStageTwoSvg from "@/components/ui/icons/milestone/tree/stage-two-svg";
import { useState } from "react";
import { Button, View } from "react-native";


export default function MilestoneDetailScreen() {
    const [stage, setStage] = useState(0)

    const getStage = () => {
        if (stage === 1) return <SeedSvg size={20}/>
        if (stage === 2) return <MilestoneTreeStageOneSvg size={60}/>
        if (stage === 3) return <MilestoneTreeStageTwoSvg size={100}/>
        if (stage === 4) return <MilestoneTreeStageThreeSvg size={200}/>
        if (stage === 5) return <MilestoneTreeStageFourSvg size={360}/>
    }

    const handleNextStage = () => {
        setStage(stage + 1)
        if (stage === 4) {
            setStage(0)
        }
    }

    return (
        <BrandingBackground variant="secondary">
            <SafeAreaAvoidingView>
                <View className="flex-col w-full h-full bg-system-light-blue">
                    <View className="mt-[60] h-1/2">
                        <AnimatedCloud startPosition={-500} endPosition={1000} duration={5000}/>
                        <AnimatedCloud startPosition={-1000} endPosition={2000} duration={10000}/>
                        <AnimatedCloud startPosition={-1500} endPosition={3000} duration={15000}/>
                    </View>
                    <View className="absolute w-full bottom-0 flex items-center">
                        <DirtIslandSvg size={200}/>
                        <View className="absolute h-1/2 flex justify-end pb-4">{getStage()}</View>
                    </View>
                    <View className="absolute w-full bottom-0 flex items-center">
                        <Button onPress={handleNextStage} title="จงตื่น"/>
                    </View>
                </View>
            </SafeAreaAvoidingView>
        </BrandingBackground>
    )
}