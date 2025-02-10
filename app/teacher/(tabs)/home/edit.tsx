import BrandingBackground from "@/components/background/branding-background"
import MemoCard from "@/components/container/memo-card"
import MemoAchievementForm from "@/components/ui/kits/form/memo-achievement-form"
import { useEditTeacherAchievementMutation } from "@/hooks/achievement/useAchievementMutation"
import { useTeacherAchievementByIdQuery } from "@/hooks/achievement/useAchievementQuery"
import { useDeleteAchievement } from "@/hooks/achievement/useDeleteAchievement"
import { MAX_ACHIEVEMENT_TYPE, useUpsertAchievement } from "@/hooks/achievement/useUpsertAchievement"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Alert } from "react-native"

export default function TeacherHomeEditScreen() {
    const { id: achievementId } = useLocalSearchParams()
    const [error, setError] = useState<string>()
    const { 
        isLoading: isLoadingAchievement, 
        data: rawTeacherAchievement, 
        refetch: refetchAchievementById 
    } = useTeacherAchievementByIdQuery(achievementId as string)
    const editAchievement = useEditTeacherAchievementMutation(achievementId as string)

    const teacherAchievement = rawTeacherAchievement?.data?.achievementTeacher
    const { 
        errors,
        form, 
        update, 
        reset,
        handleAddType,
        handleRemoveType,
        handleSubmit,
    } = useUpsertAchievement(achievementId as string, editAchievement, setError )

    //Loading form value
    useEffect(() => {
        if (!teacherAchievement) return
        const formattedData = {
            name: teacherAchievement.name ?? "",
            amount: String(teacherAchievement.people.max ?? ""),
            startDate: new Date(teacherAchievement.sections.startDate),
            endDate: new Date(teacherAchievement.sections.endDate),
            points: teacherAchievement.points?.map(point => ({ 
                id: point.id, 
                normal: String(point.normal), 
                excellent: String(point.excellent) 
            })) ?? [],
            description: teacherAchievement.description ?? "",
        }
        reset(formattedData)
    }, [teacherAchievement, reset])

    const { handleDelete } = useDeleteAchievement(achievementId as string, setError)

    const handlePressEdit = () => {
        handleSubmit("เกิดข้อผิดพลาดในการแก้ไขเป้าหมาย", () => {
            router.back()
            refetchAchievementById()
        })
    }

    const handlePressDelete = () => {
        const confirmDelete = () => {
            handleDelete("เกิดข้อผิดพลาดในการลบเป้าหมาย", () => {
                router.push("/teacher/home")
            })
        }

        Alert.alert("คุณต้องการลบเป้าหมายนี้ใช่ไหม", undefined, [
            { text: "ลบ", onPress: confirmDelete, style: "destructive" },
            { text: "ยกเลิก", style: "cancel" }
        ])
    }

    return (
        <BrandingBackground className="justify-end items-center">
            <MemoCard size="full" className="!p-0">
                <MemoAchievementForm
                    isLoading={isLoadingAchievement}
                    form={form}
                    errors={errors}
                    error={error}
                    maxTypes={MAX_ACHIEVEMENT_TYPE}
                    update={update}
                    onAddType={handleAddType}
                    onRemoveType={handleRemoveType}
                    primaryButton={{
                        label: "แก้ไขเป้าหมาย",
                        onPress: handlePressEdit
                    }}
                    secondaryButton={{
                        label: "ลบเป้าหมาย",
                        onPress: handlePressDelete
                    }}
                />
            </MemoCard>
        </BrandingBackground>
    )
}