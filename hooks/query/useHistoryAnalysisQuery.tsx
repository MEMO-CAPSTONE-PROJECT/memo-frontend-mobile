import { MemoApis } from "@/constants/apis"
import api from "@/shared/api-handler"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface HistoryScoresWeekResponse {
    data: {
        points: WeekPoint[]
    }
}

interface WeekPoint {
    nameDay: string
    dayOfWeek: number
    activityCount: number
}

export function useHistoryScoresWeekQuery(studentId: string) {
    return useQuery<null, AxiosError, HistoryScoresWeekResponse>({
        queryKey: ["history","scores", studentId],
        queryFn: async () => {
            const result = await api.get(MemoApis.HISTORY_SCORES_WEEK({ studentId: studentId }))
            return result.data
        },
    })
}

interface HistoryAchievementMaxScoreResponse {
    data: {
        result: {
            type: string
            count: number
        }
    }
}

export function useHistoryAchievementMaxScoreQuery(studentId: string) {
    return useQuery<null, AxiosError, HistoryAchievementMaxScoreResponse>({
        queryKey: ["history","achievement","max", studentId],
        queryFn: async () => {
            const result = await api.get(MemoApis.HISTORY_COUNT_MAX({ studentId: studentId }))
            return result.data
        },
    })
}

interface HistoryAchievementCountResponse {
    data: {
        results: number
    }
}

export function useHistoryAchievementCount(studentId: string) {
    return useQuery<null, AxiosError, HistoryAchievementCountResponse>({
        queryKey: ["history","achievement","count", studentId],
        queryFn: async () => {
            const result = await api.get(MemoApis.HISTORY_COUNT_ALL({ studentId: studentId }))
            return result.data
        },
    })
}

interface HistoryScoresAptitudesResponse {
    data: {
        results: AptitudesScoreComparison[]
    }
}

interface AptitudesScoreComparison {
    type: string
    currentWeekScore: number
    previousWeekScore: number
    percentChange: number
}

export function useHistoryScoresAptitudesQuery(studentId: string) {
    return useQuery<null, AxiosError, HistoryScoresAptitudesResponse>({
        queryKey: ["history","scores","aptitudes", studentId],
        queryFn: async () => {
            const result = await api.get(MemoApis.HISTORY_SCORES_APTITUDES({ studentId: studentId }))
            return result.data
        },
    })
}

interface HistoryScoresAptitudeComparisonResponse {
    data: {
        results: AptitudeScoreComparison[]
    }
}

interface AptitudeScoreComparison {
    nameDay: string
    dayOfWeek: number
    previousEndDateFormatted: string
    currentEndDateFormatted: string
    previousWeekTotal: number //score
    currentWeekTotal: number //score
    currentWeekCount: number //count
    previousWeekCount: number //count
    percentChange: number
}

export function useHistoryScoresAptitudeComparisonQuery(studentId: string, type: string) {
    return useQuery<null, AxiosError, HistoryScoresAptitudeComparisonResponse>({
        queryKey: ["history","scores","aptitude", studentId, type],
        queryFn: async () => {
            const result = await api.get(MemoApis.HISTORY_SCORES_APTITUDE_COMPARISON({ studentId: studentId, type: type }))
            return result.data
        },
    })
}

interface HistoryCountByTypeResponse {
    data: {
        results: HistoryCountResults[]
    }
}

interface HistoryCountResults {
    status: "completed" | "in-progress"
    count: number
    percentage: number
}

export function useHistoryCountByTypeQuery(studentId: string, type: string) {
    return useQuery<null, AxiosError, HistoryCountByTypeResponse>({
        queryKey: ["history","count", studentId, type],
        queryFn: async () => {
            const result = await api.get(MemoApis.HISTORY_COUNT_BY_TYPE({ studentId: studentId, type: type }))
            return result.data
        },
    })
}

interface HistoryPromptResponse {
    data: {
        messages: HistoryPrompt
    }
}

interface HistoryPrompt {
    tag: string
    strengths: string
    weakness: string
    personality: string
    support: string
}

export function useHistoryPromptQuery(studentId: string) {
    return useQuery<null, AxiosError, HistoryPromptResponse>({
        queryKey: ["history","prompt", studentId],
        queryFn: async () => {
            const result = await api.get(MemoApis.HISTORY_PERSONAL_PROMPT({ studentId: studentId }))
            return result.data
        },
    })
}

interface HistoryMainResponse {
    data: {
        result: {
            type: string
            totalScore: number
            count: number
        }
    }
}

export function useHistoryMainQuery(studentId: string) {
    return useQuery<null, AxiosError, HistoryMainResponse>({
        queryKey: ["history","main", studentId],
        queryFn: async () => {
            const result = await api.get(MemoApis.HISTORY_PERSONAL_MAIN({ studentId: studentId }))
            return result.data
        },
    })
}