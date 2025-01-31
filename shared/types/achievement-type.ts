
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
    src: string
    people: People
    sections: Section
    points: Point[]
}

export interface StudentAchievement extends Achievement {
    isOpen: boolean
}

export interface StudentAchievementById extends StudentAchievement {
    description: string
}

export interface TeacherAchievement extends Achievement {
    teacherId: string
}

export interface TeacherAchievementById extends TeacherAchievement {
    description: string
}