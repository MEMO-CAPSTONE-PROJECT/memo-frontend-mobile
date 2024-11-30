import { MemoApis } from "@/constants/apis";
import { mockUseGetAptitudes } from "@/hooks/mock/useAptitude.mock";
import api from "@/shared/api-handler";
import { MemoConfig } from "@/shared/config";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Aptitude {
    id: string
    type: string
    color: string
}

export interface GetAptitudeResponse {
    data: {
        aptitudes: Aptitude[]
    }
}

export function useGetAptitudes() {
    return useQuery<null, AxiosError, GetAptitudeResponse>({
        queryKey: ["aptitudes"],
        queryFn: async () => {
            if (MemoConfig.isMock) return mockUseGetAptitudes
            const result = await api.get(MemoApis.APTITUDES)
            return result.data
        },
    })
}