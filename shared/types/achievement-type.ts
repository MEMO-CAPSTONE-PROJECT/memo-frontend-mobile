
interface People {
    current: number
    max: number
}
interface Section {
    startDate: string
    endDate: string
    organizer: string
}
export interface Point {
    id: string
    excellent: number
    normal: number
    details: {
        id: string
        type: string
        color: string
    }[]
}

interface AchievementImage {
    fileName: string
    fileId: string
    fileEndPoint: string
}

export interface Achievement {
    id: string
    name: string
    src: string
    people: People
    sections: Section
    points: Point[]
    images: AchievementImage[]
}

export interface AchievementById extends Achievement {
    description: string
}

interface StudentParticipant {
    studentId: string
    status: boolean
}

export interface StudentAchievement extends Achievement {
    isOpen: boolean
}

export interface StudentAchievementById extends StudentAchievement, AchievementById {}

export interface StudentAchievementParticipantById extends StudentAchievementById {
    participants: StudentParticipant
}

export interface TeacherAchievement extends Achievement {
    teacherId: string
}

export interface TeacherAchievementById extends TeacherAchievement, AchievementById {}

export interface MemoAchievementAptitude {
    id: string
    type: string
    color: string
}

export interface StudentScore {
    type: string
    score: number
}