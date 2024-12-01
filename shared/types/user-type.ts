
export interface TeacherUser {
    sub: string //ID
    firstName: string
    lastName: string
    gender: string
    position: string
    classRoom: string
    classLevel: string
}

export interface StudentUser {
    sub: string //ID
    firstName: string
    lastName: string
    gender: string
    classRoom: string
    classLevel: string
}

export interface ParentUser {
    sub: string //ID
    phoneNumber: string
    firstName: string
    lastName: string
    gender: string
}