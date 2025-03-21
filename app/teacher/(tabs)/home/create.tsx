import BrandingBackground from "@/components/background/branding-background";
import MemoImageCarouselPicker from "@/components/carousel/memo-image-carousel-picker";
import MemoCard from "@/components/container/memo-card";
import MemoAchievementForm from "@/components/ui/kits/form/memo-achievement-form";
import { useFormContext } from "@/context/useForm";
import { useCreateTeacherAchievementMutation } from "@/hooks/achievement/useAchievementMutation";
import { MAX_ACHIEVEMENT_TYPE, useUpsertAchievement } from "@/hooks/achievement/useUpsertAchievement";
import useImagePicker from "@/hooks/image/useImagePicker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function TeacherHomeCreateScreen() {
    const [error, setError] = useState<string>()
    const { images, setImages, handlePickImage } = useImagePicker()
    const createAchievement = useCreateTeacherAchievementMutation()

    const { clear } = useFormContext()
    const {
        handleSubmit,
        handleAddType,
        handleRemoveType,
    } = useUpsertAchievement(createAchievement, setError)

    useEffect(() => {
        clear()
    }, [])

    const handlePressCreate = () => {
        handleSubmit("เกิดข้อผิดพลาดในการสร้างเป้าหมาย", images.map(
            item => ({ uri: item.path, filename: item.fileName, mime: item.mime })
        ), () => {
            router.replace("/teacher/home")
            Alert.alert("สร้างเป้าหมายสำเร็จ", "เป้าหมายของคุณถูกสร้างแล้ว", [
                {
                    text: "ตกลง",
                    style: "cancel"
                }
            ])
        })   
    }
    const handleRemoveImage = (index: number) => {
        const newImages = [...images]
        newImages.splice(index, 1)
        setImages(newImages)
    }
    
    return (
        <BrandingBackground className="justify-end items-center">
            <MemoCard size="full" className="!p-0">
                <MemoAchievementForm
                    isLoading={createAchievement.isPending}
                    error={error}
                    maxTypes={MAX_ACHIEVEMENT_TYPE}
                    onAddType={handleAddType}
                    onRemoveType={handleRemoveType}
                    primaryButton={{ 
                        label: "สร้างเป้าหมายใหม่", 
                        onPress: handlePressCreate 
                    }}
                >              
                    <MemoImageCarouselPicker 
                        images={images.map(item => ({ uri: item.path }))} 
                        baseUrl="" 
                        onPick={handlePickImage}
                        onRemove={handleRemoveImage}
                    />    

                </MemoAchievementForm>
            </MemoCard>
        </BrandingBackground>
    )
}