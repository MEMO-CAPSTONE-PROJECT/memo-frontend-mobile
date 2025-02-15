import { MemoApis } from "@/constants/apis"
import { mockUseCreateTeacherAchievement } from "@/hooks/mock/useAchievement.mock"
import api from "@/shared/api-handler"
import { MemoConfig } from "@/shared/config"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import FormData from "form-data"

export interface BaseImageRequestBody {
    uri: string
    filename?: string
    mime: string
}
export interface BaseAchievementBody {
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
export interface BaseAchievementRequest<T> {
    json: T
    images: BaseImageRequestBody[]
}

export type CreateAchievementRequestBody = BaseAchievementBody
export type CreateAchievementRequest = BaseAchievementRequest<CreateAchievementRequestBody>

export function useCreateTeacherAchievementMutation() {
    return useMutation<null, AxiosError, CreateAchievementRequest>({
        mutationFn: async ({ json, images }) => {
            if (MemoConfig.isMock) return mockUseCreateTeacherAchievement
            const formdata = new FormData()
            formdata.append("json", JSON.stringify(json))
            
            images.forEach((image) => {
                formdata.append("images", {
                    uri: image.uri,
                    name: image.filename,
                    type: image.mime
                })
            })
            
            const result = await api.post(MemoApis.CREATE_ACHIEVEMENTS_TEACHER, 
                formdata, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            return result.data
        },
    })
}

export interface EditAchievementRequestBody extends BaseAchievementBody {
    deleteImages: string[] //image ids
}
export type EditAchievementRequest = BaseAchievementRequest<EditAchievementRequestBody>

export function useEditTeacherAchievementMutation(achievementId: string) {
    return useMutation<null, AxiosError, EditAchievementRequest>({
        mutationFn: async ({ json }) => {
            if (MemoConfig.isMock) return mockUseCreateTeacherAchievement
            const formdata = new FormData()
            formdata.append("json", JSON.stringify(json))
            
            const result = await api.put(MemoApis.EDIT_ACHIEVEMENT_TEACHER(achievementId), 
                formdata, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
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

interface JoinAchievementRequest {
    studentId: string
    achievementId: string
}

export function useJoinAchievementMutation() {
    return useMutation<null, AxiosError, JoinAchievementRequest>({
        mutationFn: async (request) => {
            const result = await api.post(MemoApis.JOIN_ACHIEVEMENT, request)
            return result.data
        },
    })
}