import { MemoApis } from "@/constants/apis";
import { mockUseCreateTeacherAchievement, mockUseStudentAchievementById, mockUseStudentAchievements, mockUseTeacherAchievementById, mockUseTeacherAchievements } from "@/hooks/mock/useAchievement.mock";
import api from "@/shared/api-handler";
import { MemoConfig } from "@/shared/config";
import { useMutation, useQuery } from "@tanstack/react-query";
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

interface AchievementsResponse {
    data: {
        achievementTeacher: Achievement[]
    } 
}

function useTeacherAchievements() {
    return useQuery<null, AxiosError, AchievementsResponse>({
        queryKey: ["teacherAchievements"],
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

export interface AchievementByIdResponse {
    data: {
        achievementTeacher: AchievementById
    }
}

function useTeacherAchievementById(id: string) {
    return useQuery<null, AxiosError, AchievementByIdResponse>({
        queryKey: ["teacherAchievement", id],
        queryFn: async () => {
            if (MemoConfig.isMock) return mockUseTeacherAchievementById
            const result = await api.get(MemoApis.ACHIEVEMENTS_TEACHER_DETAIL(id))
            return result.data
        },
    })
}

interface CreateAchievementRequest {
    teacherId: string
    name: string
    amount: string
    startDate: string
    endDate: string
    points: {
        id: string
        normal: string
        excellent: string
    }[]
    description: string
}

function useCreateTeacherAchievement() {
    return useMutation<null, AxiosError, CreateAchievementRequest>({
        mutationFn: async (request) => {
            if (MemoConfig.isMock) return mockUseCreateTeacherAchievement
            
            const result = await api.post(MemoApis.CREATE_ACHIEVEMENTS_TEACHER, request)
            return result.data
        },
    })
}

function useEditTeacherAchievement(achievementId: string) {
    return useMutation<null, AxiosError, CreateAchievementRequest>({
        mutationFn: async (request) => {
            if (MemoConfig.isMock) return mockUseCreateTeacherAchievement
            
            const result = await api.put(MemoApis.EDIT_ACHIEVEMENT_TEACHER(achievementId), request)
            return result.data
        },
    })
}

function useDeleteTeacherAchievement(achievementId: string) {
    return useMutation<null, AxiosError>({
        mutationFn: async () => {
            if (MemoConfig.isMock) return mockUseCreateTeacherAchievement
            
            const result = await api.delete(MemoApis.DELETE_ACHIEVEMENT_TEACHER(achievementId))
            return result.data
        },
    })
}

interface StudentAchievementResponse {
    data: {
        achievementStudent: (Omit<Achievement, "teacherId"> & { isOpen: boolean })[]
    }
}

function useStudentAchievements() {
    return useQuery<null, AxiosError, StudentAchievementResponse>({
        queryKey: ["studentAchievements"],
        queryFn: async () => {
            if (MemoConfig.isMock) return mockUseStudentAchievements
            const result = await api.get(MemoApis.ACHIEVEMENTS_STUDENT)
            return result.data
        },
    })
}

interface StudentAchievementByIdResponse {
    data: {
        achievementStudent: (Omit<AchievementById, "teacherId"> & { isOpen: boolean })
    }
}
function useStudentAchievementById(id: string) {
    return useQuery<null, AxiosError, StudentAchievementByIdResponse>({
        queryKey: ["studentAchievement", id],
        queryFn: async () => {
            if (MemoConfig.isMock) return mockUseStudentAchievementById
            const result = await api.get(MemoApis.ACHIEVEMENTS_STUDENT_DETAIL(id))
            return result.data
        },
    })
}

export { useCreateTeacherAchievement, useDeleteTeacherAchievement, useStudentAchievementById, useStudentAchievements, useTeacherAchievementById, useTeacherAchievements, useEditTeacherAchievement };

