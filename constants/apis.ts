import { setSearchParams } from "@/shared/utils/param-util"

export const MemoBaseURL = {
    PRIVATE: "http://localhost:8080",
    DEVELOPMENT: "http://cp24sy1.sit.kmutt.ac.th:8081",
    PUBLIC: "https://capstone24.sit.kmutt.ac.th/sy1/mobile/apis",
    BASE: "https://capstone24.sit.kmutt.ac.th/sy1",
    PRIVATE_BASE: "https://cp24sy1.sit.kmutt.ac.th"
}

export const MemoApis = {
    LOGIN_TEACHER: `/v1/teacher/login`,
    LOGIN_STUDENT: `/v1/student/login`,
    LOGIN_PARENT: `/v1/parent/login`,

    VERIFY_LOGIN_STUDENT: `/v1/student/login/verify`,
    VERIFY_LOGIN_TEACHER: `/v1/teacher/login/verify`,
    VERIFY_LOGIN_PARENT: `/v1/parent/login/verify`,

    PARENTS: `/v1/parents`, //required Bearer token
    APTITUDES: `/v1/aptitudes`, //required Bearer token

    ACHIEVEMENTS_TEACHER: `/v1/achievement/teachers`, //required Bearer token
    ACHIEVEMENTS_STUDENT: (params?: { studentId?: string }) => {
        if (params) {    
            const searchParams = new URLSearchParams()
            if (params.studentId) searchParams.set("studentId", params.studentId)
            return `/v1/achievement/students?${searchParams.toString()}`
        }
        return `/v1/achievement/students`
    },
    CREATE_ACHIEVEMENTS_TEACHER: `/v1/achievement/teacher`, //required Bearer token
    EDIT_ACHIEVEMENT_TEACHER: (achievementId: string) => `/v1/achievement/teacher/${achievementId}`, //required Bearer token
    DELETE_ACHIEVEMENT_TEACHER: (achievementId: string) => `/v1/achievement/teacher/${achievementId}`, //required Bearer token
    ACHIEVEMENTS_TEACHER_DETAIL: (id: string) => `/v1/achievement/teacher/${id}`, //required Bearer token
    ACHIEVEMENTS_STUDENT_DETAIL: (id: string, params?: { studentId?: string }) => {
        if (params) {
            const searchParams = new URLSearchParams()
            if (params.studentId) searchParams.set("studentId", params.studentId)
            return `/v1/achievement/student/${id}?${searchParams.toString()}`
        }
        return `/v1/achievement/student/${id}`
    }, //required Bearer token
    CREATE_ACHIEVEMENT_CODE: (achievementId: string) => `/v1/achievement/code/${achievementId}`, //required Bearer token
    JOIN_ACHIEVEMENT: `/v1/achievement/student/join`, //required Bearer token

    PARENT_DETAIL: (params: { parentId?: number, phoneNumber: string, email?: string, firstName?: string, lastName?: string, relation?: string }) => {
        const searchParams = setSearchParams(params)
        return `/v1/parent?${searchParams.toString()}`
    },
    STUDENT_RANKING: (params: { classLevel?: number, classRoom?: number}) => {
        const searchParams = setSearchParams(params)
        
        return `/v1/student/rank?${searchParams.toString()}`
    },
    STUDENT_DETAIL: (id: string) => `/v1/student/${id}`, //required Bearer token

    HISTORY_SCORES_WEEK: (params: { studentId: string }) => {
        const searchParams = setSearchParams(params)
        return `/v1/history/scores/week?${searchParams.toString()}`
    },
    HISTORY_COUNT_BY_TYPE: (params: { studentId: string, type: string }) => {
        const searchParams = setSearchParams(params)
        return `/v1/history/count?${searchParams.toString()}`
    },
    HISTORY_COUNT_MAX: (params: { studentId: string }) => {
        const searchParams = setSearchParams(params)
        return `/v1/history/count/max?${searchParams.toString()}`
    }, 
    HISTORY_SCORES_APTITUDES: (params: { studentId: string }) => {
        const searchParams = setSearchParams(params)
        return `/v1/history/scores/aptitudes?${searchParams.toString()}`
    },
    HISTORY_SCORES_APTITUDE_COMPARISON: (params: { studentId: string, type: string }) => {
        const searchParams = setSearchParams(params)
        return `/v1/history/scores/aptitude?${searchParams.toString()}`
    },
    HISTORY_PERSONAL_PROMPT: (params: { studentId: string }) => {
        const searchParams = setSearchParams(params)
        return `/v1/history/personal/prompt?${searchParams.toString()}`
    },
    HISTORY_PERSONAL_MAIN: (params: { studentId: string }) => {
        const searchParams = setSearchParams(params)
        return `/v1/history/personal/main?${searchParams.toString()}`
    },
    AI_CHAT: (params: { message: string }) => {
        const searchParams = setSearchParams(params)
        return `/ai/chat?${searchParams.toString()}`
    },
    PUT_STUDENT_SCORE: `/v1/student/score`, //required Bearer token, required body
    PUT_MILESTONE_SPENDING: `/v1/milestone/spending`, //required Bearer token, required body
}