import { MemoApis } from "@/constants/apis";
import { mockUseStudentAchievementById, mockUseStudentAchievements, mockUseTeacherAchievementById, mockUseTeacherAchievements } from "@/hooks/mock/useAchievement.mock";
import api from "@/shared/api-handler";
import { MemoConfig } from "@/shared/config";
import { StudentAchievement, StudentAchievementParticipantById, TeacherAchievement, TeacherAchievementById } from "@/shared/types/achievement-type";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface AchievementsResponse {
    data: {
        achievementTeacher: TeacherAchievement[]
    } 
}

export function useTeacherAchievementsQuery() {
    return useQuery<null, AxiosError, AchievementsResponse>({
        queryKey: ["achievements", "teacher"],
        queryFn: async () => {
            if (MemoConfig.isMock) return mockUseTeacherAchievements
            const result = await api.get(MemoApis.ACHIEVEMENTS_TEACHER)
            return result.data
        },
    })
}

export interface AchievementByIdResponse {
    data: {
        achievementTeacher: TeacherAchievementById
    }
}

export function useTeacherAchievementByIdQuery(achievementId: string) {
    return useQuery<null, AxiosError, AchievementByIdResponse>({
        queryKey: ["achievements", "teacher", achievementId],
        queryFn: async () => {
            if (MemoConfig.isMock) return mockUseTeacherAchievementById
            const result = await api.get(MemoApis.ACHIEVEMENTS_TEACHER_DETAIL(achievementId))
            return result.data
        },
    })
}

interface StudentAchievementResponse {
    data: {
        achievementStudent: StudentAchievement[]
    }
}

export function useStudentAchievementsQuery(params?: { studentId?: string }) {
    return useQuery<null, AxiosError, StudentAchievementResponse>({
        queryKey: ["achievements", "student", params?.studentId ?? "all"],
        queryFn: async () => {
            if (MemoConfig.isMock) return mockUseStudentAchievements
            const result = await api.get(MemoApis.ACHIEVEMENTS_STUDENT(params))
            return result.data
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}

interface StudentAchievementByIdResponse {
    data: {
        achievementStudent: StudentAchievementParticipantById
    }
}

export function useStudentAchievementByIdQuery(id: string, params?: { studentId?: string }) {
    return useQuery<null, AxiosError, StudentAchievementByIdResponse>({
        queryKey: ["achievements", "student", id],
        queryFn: async () => {
            if (MemoConfig.isMock) return mockUseStudentAchievementById
            const result = await api.get(MemoApis.ACHIEVEMENTS_STUDENT_DETAIL(id, params))
            return result.data
        },
    })
}
