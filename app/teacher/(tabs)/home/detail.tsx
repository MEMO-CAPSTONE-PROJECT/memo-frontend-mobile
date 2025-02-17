import BrandingBackground from "@/components/background/branding-background";
import MemoIconTextButton from "@/components/button/memo-icon-text-button";
import MemoCard from "@/components/container/memo-card";
import ScrollableView from "@/components/scrollable/scrollable-view";
import MemoContentDetail from "@/components/ui/kits/container/memo-content-detail";
import MemoDetailSkeleton from "@/components/ui/kits/skeleton/memo-detail-skeleton";
import { useTeacherAchievementByIdQuery } from "@/hooks/achievement/useAchievementQuery";
import { useTeacherToken } from "@/hooks/useUserToken";
import { router, useLocalSearchParams } from "expo-router";
import { NotePencil, QrCode } from "phosphor-react-native";
import { View } from "react-native";

export default function TeacherDetailScreen() {
    const { id } = useLocalSearchParams()
    const { data, isLoading, isError } = useTeacherAchievementByIdQuery(id as string)
    const achievement = data?.data?.achievementTeacher
    const { data: teacher } = useTeacherToken()
    const isOwner = teacher?.sub === achievement?.teacherId

    function handleEdit() {
        router.push({
            pathname: "/teacher/home/edit",
            params: { id: id }
        })
    }
    function handleCreateQRCode() {
        router.push({
            pathname: "/teacher/home/qr-code",
            params: { id: id, name: achievement?.name }
        })
    }

    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" className="!p-0 !pt-0 !rounded-t-none">
                <ScrollableView border={false}>
                    <MemoDetailSkeleton isLoading={isLoading || isError}>
                        <MemoContentDetail achievement={achievement}>
                            {isOwner && 
                                <View className="p-[1.5rem] flex-col gap-y-md">
                                    <MemoIconTextButton name="สร้างคิวอาร์โค้ด" icon={QrCode} variant="secondary" onPress={handleCreateQRCode} />
                                    <MemoIconTextButton name="แก้ไข" icon={NotePencil} variant="darkRed" onPress={handleEdit} />
                                </View>
                            }     
                        </MemoContentDetail>
                    </MemoDetailSkeleton>
                </ScrollableView>
            </MemoCard>
        </BrandingBackground >
    )
}