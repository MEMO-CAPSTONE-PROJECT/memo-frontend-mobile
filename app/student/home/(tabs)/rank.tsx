import BrandingBackground from "@/components/background/branding-background";
import MemoCard from "@/components/container/memo-card";
import { Text } from "react-native";

export default function StudentRankScreen() {
    return (
        <BrandingBackground variant="secondary" appbar>
            <MemoCard size="full">
                <Text>Rank</Text>
            </MemoCard>
        </BrandingBackground>
    )
}