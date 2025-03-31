import { MemoApis } from "@/constants/apis"
import api from "@/shared/api-handler"
import { StudentScore } from "@/shared/types/achievement-type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface SubmitAchievementCodeRequest {
    studentId: string
    achievementId: string
    code: string
}

interface SubmitAchievementCodeResponse {
    data: {
        totalScore: StudentScore[]
    }
}

export function useSubmitAchievementCodeMutation() {
    return useMutation<SubmitAchievementCodeResponse, AxiosError, SubmitAchievementCodeRequest>({
        mutationFn: async (request) => {
            const result = await api.put(MemoApis.PUT_STUDENT_SCORE, request)    
            if (result instanceof AxiosError) {
                return Promise.reject(result)
            }
            return result.data
        }
    })
}