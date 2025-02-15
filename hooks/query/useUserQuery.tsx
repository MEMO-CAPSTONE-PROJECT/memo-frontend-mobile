import { MemoApis } from "@/constants/apis";
import { mockUseParentById, mockUseStudentById } from "@/hooks/mock/useUser.mock";
import api from "@/shared/api-handler";
import { MemoConfig } from "@/shared/config";
import { StudentPoint } from "@/shared/types/criteria-type";
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

interface ParentResponse {
    data: { 
        parent: Parent 
    }
}

export function useParentByPhoneNumberQuery(phoneNumber: string, enabled: boolean) {
    return useQuery<null, AxiosError, ParentResponse>({
        queryKey: ["parent", phoneNumber],
        enabled: enabled,
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

export function useStudentByIdQuery(id: string, enabled = true) {
    return useQuery<null, AxiosError, StudentResponse>({
        queryKey: ["student", id],
        enabled: enabled,
        queryFn: async () => {
            if (MemoConfig.isMock) return mockUseStudentById
            const result = await api.get(MemoApis.STUDENT_DETAIL(id))
            return result.data
        },
    })
}