import BrandingBackground from "@/components/background/branding-background";
import MemoCard from "@/components/container/memo-card";
import { Text } from "react-native";

export default function StudentRankScreen() {
    return (
        <BrandingBackground variant="secondary">
           <MemoCard size="full" className="justify-center items-center">
                <Text className="font-kanit-medium">Rank future release</Text>
            </MemoCard>
        </BrandingBackground>
    )
}