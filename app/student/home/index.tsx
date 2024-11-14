import BrandingBackground from "@/components/background/branding-background";
import MemoCard from "@/components/container/memo-card";
import { View } from "react-native";

export default function StudentHomeScreen() {
    return (
        <BrandingBackground variant="secondary" appbar>
            <MemoCard size="full">
                <View>

                </View>
            </MemoCard>
        </BrandingBackground>
    )
}