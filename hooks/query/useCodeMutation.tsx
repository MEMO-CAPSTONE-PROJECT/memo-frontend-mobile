import { MemoApis } from "@/constants/apis"
import api from "@/shared/api-handler"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface SubmitAchievementCodeRequest {
    studentId: string
    achievementId: string
    code: string
}
interface StudentScore {
    type: string
    score: number
}

interface SubmitAchievementCodeResponse {
    data: {
        totalScore: StudentScore[]
    }
}

export function useSubmitAchievementCodeMutation() {
    return useMutation<SubmitAchievementCodeResponse, AxiosError, SubmitAchievementCodeRequest>({
        mutationFn: async (request) => {
            const result = await api.post(MemoApis.CREATE_STUDENT_SCORE, request)    
            if (result instanceof AxiosError) {
                return Promise.reject(result)
            }
            return result.data
        }
    })
}