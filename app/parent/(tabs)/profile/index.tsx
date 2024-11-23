import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoCard from "@/components/container/memo-card";
import { useRouter } from "expo-router";

export default function ParentProfileScreen() {
    const router = useRouter()
    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full">
                <MemoButton name="ออกจากระบบ" variant="primary" onPress={() => router.navigate("/")} />
            </MemoCard>
        </BrandingBackground>
    )
}