import { MemoApis } from "@/constants/apis";
import { mockUseGetAptitudes } from "@/hooks/mock/useAptitude.mock";
import api from "@/shared/api-handler";
import { MemoConfig } from "@/shared/config";
import { MemoAchievementAptitude } from "@/shared/types/achievement-type";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface GetAptitudeResponse {
    data: {
        aptitudes: MemoAchievementAptitude[]
    }
}

export function useGetAptitudesQuery() {
    return useQuery<null, AxiosError, GetAptitudeResponse>({
        queryKey: ["aptitudes"],
        queryFn: async () => {
            if (MemoConfig.isMock) return mockUseGetAptitudes
            const result = await api.get(MemoApis.APTITUDES)
            return result.data
        },
    })
}