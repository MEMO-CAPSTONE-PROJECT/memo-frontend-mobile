
export const MemoBaseURL = {
    PRIVATE: "http://localhost:8080",
    DEVELOPMENT: "http://cp24sy1.sit.kmutt.ac.th:8081",
    PUBLIC: "https://capstone24.sit.kmutt.ac.th/sy1/mobile/apis"
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
    ACHIEVEMENTS_STUDENT: `/v1/achievement/students`, //required Bearer token
    CREATE_ACHIEVEMENTS_TEACHER: `/v1/achievement/teacher`, //required Bearer token
    ACHIEVEMENTS_TEACHER_DETAIL: (id: string) => `/v1/achievement/teacher/${id}`, //required Bearer token
    ACHIEVEMENTS_STUDENT_DETAIL: (id: string) => `/v1/achievement/student/${id}`, //required Bearer token

    PARENT_DETAIL: (phoneNumber: string) => `/v1/parent/${phoneNumber}`, //required Bearer token
    STUDENT_DETAIL: (id: string) => `/v1/student/${id}`, //required Bearer token
    
}