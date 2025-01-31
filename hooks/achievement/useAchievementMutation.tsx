import { MemoApis } from "@/constants/apis"
import { mockUseCreateTeacherAchievement } from "@/hooks/mock/useAchievement.mock"
import api from "@/shared/api-handler"
import { MemoConfig } from "@/shared/config"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"


export interface CreateAchievementRequest {
    teacherId: string
    name: string
    amount: string
    startDate: string
    endDate: string
    points: {
        id: string
        normal: string
        excellent: string
    }[]
    description: string
}

export function useCreateTeacherAchievementMutation() {
    return useMutation<null, AxiosError, CreateAchievementRequest>({
        mutationFn: async (request) => {
            if (MemoConfig.isMock) return mockUseCreateTeacherAchievement
            
            const result = await api.post(MemoApis.CREATE_ACHIEVEMENTS_TEACHER, request)
            return result.data
        },
    })
}

export function useEditTeacherAchievementMutation(achievementId: string) {
    return useMutation<null, AxiosError, CreateAchievementRequest>({
        mutationFn: async (request) => {
            if (MemoConfig.isMock) return mockUseCreateTeacherAchievement
            
            const result = await api.put(MemoApis.EDIT_ACHIEVEMENT_TEACHER(achievementId), request)
            return result.data
        },
    })
}

export function useDeleteTeacherAchievementMutation(achievementId: string) {
    return useMutation<null, AxiosError>({
        mutationFn: async () => {
            if (MemoConfig.isMock) return mockUseCreateTeacherAchievement
            
            const result = await api.delete(MemoApis.DELETE_ACHIEVEMENT_TEACHER(achievementId))
            return result.data
        },
    })
}