import { useDeleteTeacherAchievementMutation } from "@/hooks/achievement/useAchievementMutation"
import { useTeacherAchievementsQuery } from "@/hooks/achievement/useAchievementQuery"
import { Dispatch, SetStateAction } from "react"

export function useDeleteAchievement(
    achievementId: string,
    setError: Dispatch<SetStateAction<string | undefined>>
) {
    const { mutateAsync: deleteAchievement, isPending } = useDeleteTeacherAchievementMutation(achievementId)
    const { refetch: refetchAchievements } = useTeacherAchievementsQuery()

    const handleDelete = async (
        errorMessage: string, 
        onSuccess?: () => void
    ) => {
        try {
            setError(undefined)
            const result = await deleteAchievement()
            
            if (result) {
                onSuccess?.()
                await refetchAchievements()
            }
        } catch (error) {
            console.error('Delete achievement error:', error)
            setError(errorMessage)
        }
    }

    return {
        isPending,
        handleDelete
    }
}