import { MemoApis } from "@/constants/apis";
import { mockUseParentById } from "@/hooks/mock/useUser.mock";
import api from "@/shared/api-handler";
import { MemoConfig } from "@/shared/config";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Parent {
    parentId: string
    phoneNumber: string
    emailParent: string
    firstName: string
    lastName: string
    relation: string
    students: Student[]
}

interface Student {
    studentId: string
    firstName: string
    lastName: string
    displayName: string
    classRoom: string
    classLevel: string
    gender: string
    points: StudentPoint[]
}

interface StudentPoint {
    type: string
    color: string
    point: number
}

interface ParentResponse {
    data: { 
        parent: Parent 
    }
}


export function useParentByPhoneNumber(phoneNumber: string) {
    return useQuery<null, AxiosError, ParentResponse>({
        queryKey: ["parent", phoneNumber],
        queryFn: async () => {
            if (MemoConfig.isMock) return mockUseParentById

            const result = await api.get(MemoApis.PARENT_DETAIL(phoneNumber))
            return result.data
        },
    })
}

interface StudentResponse {
    data: {
        student: Student
    }
}

export function useStudentById(id: string) {
    return useQuery<null, AxiosError, StudentResponse>({
        queryKey: ["student", id],
        queryFn: async () => {
            const result = await api.get(MemoApis.STUDENT_DETAIL(id))
            return result.data
        },
    })
}