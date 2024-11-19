import BrandingBackground from "@/components/background/branding-background";
import MemoCard from "@/components/container/memo-card";
import { Text } from "react-native";

export default function TeacherAchievementScreen() {
    return (
        <BrandingBackground variant="secondary" appbar>
            <MemoCard size="full">
                <Text>Achievement</Text>
            </MemoCard>
        </BrandingBackground>
    )
}