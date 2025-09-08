import { MemoApis } from "@/constants/apis"
import api from "@/shared/api-handler"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface MilestoneSpendingRequest {
    studentId: string
    type: string
    spending: string
}

export function useMilestoneSpendingMutation() {
    return useMutation<null, AxiosError, MilestoneSpendingRequest>({
        mutationFn: async (request) => {
            const result = await api.put(MemoApis.PUT_MILESTONE_SPENDING, request)
            return result.data
        }
    })
}