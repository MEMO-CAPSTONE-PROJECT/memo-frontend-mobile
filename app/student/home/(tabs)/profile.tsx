
import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoCard from "@/components/container/memo-card";
import { router } from "expo-router";

export default function StudentProfileScreen() {
    return (
        <BrandingBackground variant="secondary" appbar>
            <MemoCard size="full">
                <MemoButton name="ออกจากระบบ" variant="primary" onPress={() => router.navigate("/")} />
            </MemoCard>
        </BrandingBackground>
    )
}