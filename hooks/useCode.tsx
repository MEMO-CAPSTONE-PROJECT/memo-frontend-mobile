import { MemoApis } from "@/constants/apis"
import api from "@/shared/api-handler"
import { MemoConfig } from "@/shared/config"
import { randomLetter } from "@/shared/utils/random-util"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface AchievementCodeResponse {
    data: {
        code: string
    } 
}

function useAchievementCode(achievementId: string) {
    return useQuery<null, AxiosError, AchievementCodeResponse>({
        queryKey: ["createCode", achievementId],
        queryFn: async () => {
            if (MemoConfig.isMock) return randomLetter(6)
            const result = await api.get(MemoApis.CREATE_ACHIEVEMENT_CODE(achievementId))
            return result.data
        },
    })
}

interface CreateStudentScoreByCodeRequest {
    studentId: string
    achievementId: string
    code: string
}

function useCreateStudentScoreByCode() {
    return useMutation<null, AxiosError, CreateStudentScoreByCodeRequest>({
        mutationFn: async (request) => {
            if (MemoConfig.isMock) return randomLetter(6)

            const result = await api.post(MemoApis.CREATE_STUDENT_SCORE, request)
            return result.data
        },
    })
}

export { useAchievementCode, useCreateStudentScoreByCode }
