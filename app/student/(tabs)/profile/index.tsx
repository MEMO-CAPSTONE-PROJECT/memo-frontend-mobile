import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoCard from "@/components/container/memo-card";
import useAuth from "@/context/useAuth";
import { router } from "expo-router";

export default function StudentProfileScreen() {
    const auth = useAuth()
    
    async function handleLogout() {
        auth.logout()
        router.replace("/")
    }

    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full">
                <MemoButton name="ออกจากระบบ" variant="primary" onPress={handleLogout} />
            </MemoCard>
        </BrandingBackground>
    )
}