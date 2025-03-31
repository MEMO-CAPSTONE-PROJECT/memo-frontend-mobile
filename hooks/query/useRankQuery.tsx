import { MemoApis } from "@/constants/apis"
import api from "@/shared/api-handler"
import { MemoConfig } from "@/shared/config"
import { StudentPoint } from "@/shared/types/criteria-type"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface RankResponse {
    data: {
        students: RankStudent[]
    }
}

interface RankStudent {
    studentId: string
    firstName: string
    lastName: string
    gender: string
    classLevel: string
    classRoom: string
    points: Omit<StudentPoint, "spending">[]
    pointsTotal: number
}

export function useRankQuery(params: { classRoom?: number, classLevel?: number }) {
    return useQuery<null, AxiosError, RankResponse>({
        queryKey: ["student","rank", params.classLevel ?? "level", params.classRoom ?? "room"],
        queryFn: async () => {
            if (MemoConfig.isMock) return []
            const result = await api.get(MemoApis.STUDENT_RANKING(params))
            return result.data
        },
    })
}
