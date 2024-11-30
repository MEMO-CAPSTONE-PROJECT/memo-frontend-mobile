
export interface TeacherUser {
    sub: string //ID
    firstName: string
    lastName: string
    gender: string
    class: {
        room: number
        level: number
    }
}

export interface StudentUser {
    sub: string //ID
    firstName: string
    lastName: string
    gender: string
    class: {
        room: number
        level: number
    }
}

export interface ParentUser {
    sub: string //ID
    phoneNumber: string
    firstName: string
    lastName: string
    gender: string
}