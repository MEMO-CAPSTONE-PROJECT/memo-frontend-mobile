import BrandingBackground from "@/components/background/branding-background";
import MemoCard from "@/components/container/memo-card";
import MemoAchievementForm from "@/components/ui/kits/form/memo-achievement-form";
import { useCreateTeacherAchievementMutation } from "@/hooks/achievement/useAchievementMutation";
import { MAX_ACHIEVEMENT_TYPE, useUpsertAchievement } from "@/hooks/achievement/useUpsertAchievement";
import { router } from "expo-router";
import React, { useState } from "react";

export default function TeacherHomeCreateScreen() {
    const [error, setError] = useState<string>()
    const createAchievement = useCreateTeacherAchievementMutation()

    const {
        errors,
        form,
        update,
        handleSubmit,
        handleAddType,
        handleRemoveType,
    } = useUpsertAchievement(undefined, createAchievement, setError)

    const handlePressCreate = () => {
        handleSubmit("เกิดข้อผิดพลาดในการสร้างเป้าหมาย", () => {
            router.replace("/teacher/home")
        })
    }
    
    return (
        <BrandingBackground className="justify-end items-center">
            <MemoCard size="full" className="!p-0">
                <MemoAchievementForm
                    isLoading={createAchievement.isPending}
                    form={form}
                    errors={errors}
                    error={error}
                    maxTypes={MAX_ACHIEVEMENT_TYPE}
                    update={update}
                    onAddType={handleAddType}
                    onRemoveType={handleRemoveType}
                    primaryButton={{ 
                        label: "สร้างเป้าหมายใหม่", 
                        onPress: handlePressCreate 
                    }}
                />
            </MemoCard>
        </BrandingBackground>
    )
}