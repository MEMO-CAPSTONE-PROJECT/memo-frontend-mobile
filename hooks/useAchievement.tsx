import { MemoApis } from "@/constants/apis";
import { mockUseTeacherAchievementById, mockUseTeacherAchievements } from "@/hooks/mock/useAchievement.mock";
import api from "@/shared/api-handler";
import { MemoConfig } from "@/shared/config";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface People {
    current: number
    max: number
}
interface Section {
    startDate: string
    endDate: string
    organizer: string
}
interface Point {
    id: string
    excellent: number
    normal: number
    details: {
        id: string
        type: string
        color: string
    }[]
}

export interface Achievement {
    id: string
    name: string
    teacherId: string
    src: string
    people: People
    sections: Section
    points: Point[]
}

interface AchievementsRequest {
    data: {
        achievementTeacher: Achievement[]
    } 
}

function useTeacherAchievements() {
    return useQuery<null, AxiosError, AchievementsRequest>({
        queryKey: ["achievements"],
        queryFn: async () => {
            if (MemoConfig.isMock) return mockUseTeacherAchievements
            const result = await api.get(MemoApis.ACHIEVEMENTS_TEACHER)
            return result.data
        },
    })
}

export interface AchievementById {
    id: string
    name: string
    teacherId: string
    src: string
    people: People
    sections: Section
    points: Point[]
    description: string
}

interface AchievementByIdRequest {
    data: {
        achievementTeacher: AchievementById
    }
}

function useTeacherAchievementById(id: string) {
    return useQuery<null, AxiosError, AchievementByIdRequest>({
        queryKey: ["achievement", id],
        queryFn: async () => {
            if (MemoConfig.isMock) return mockUseTeacherAchievementById
            const result = await api.get(MemoApis.ACHIEVEMENTS_TEACHER_DETAIL(id))
            return result.data
        },
    })
}

export { useTeacherAchievementById, useTeacherAchievements };
