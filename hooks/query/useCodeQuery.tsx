import { MemoApis } from "@/constants/apis"
import api from "@/shared/api-handler"
import { MemoConfig } from "@/shared/config"
import { randomLetter } from "@/shared/utils/random-util"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface AchievementCodeResponse {
    data: {
        normalCode: string
        excellenceCode: string
    } 
}

export function useAchievementCodeQuery(achievementId: string) {
    return useQuery<null, AxiosError, AchievementCodeResponse>({
        queryKey: ["createCode", achievementId],
        queryFn: async () => {
            if (MemoConfig.isMock) return randomLetter(6)
            const result = await api.get(MemoApis.CREATE_ACHIEVEMENT_CODE(achievementId))
            return result.data
        },
    })
}
