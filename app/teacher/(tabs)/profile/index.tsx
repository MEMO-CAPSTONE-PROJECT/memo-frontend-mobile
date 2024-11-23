import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoCard from "@/components/container/memo-card";
import { router } from "expo-router";

export default function TeacherProfileScreen() {
    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full">
                <MemoButton name="ออกจากระบบ" variant="primary" onPress={() => router.navigate("/")} />
            </MemoCard>
        </BrandingBackground>
    )
}