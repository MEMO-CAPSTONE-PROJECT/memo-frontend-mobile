import { MemoApis } from "@/constants/apis"
import { mockUseParentOTP, mockUseStudentOTP, mockUseTeacherOTP } from "@/hooks/mock/useOTP.mock"
import api from "@/shared/api-handler"
import { MemoConfig } from "@/shared/config"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface TeacherOTPRequest {
    teacherId: string
}
interface TeacherOTPResponse {
    data: {
        emailTeacher: string
    }
}

export function useTeacherOTPMutation(): UseMutationResult<TeacherOTPResponse, AxiosError, TeacherOTPRequest> {
    return useMutation<TeacherOTPResponse, AxiosError, TeacherOTPRequest>({
        mutationFn: async (request) => {
            if (MemoConfig.isMock) return mockUseTeacherOTP

            const response = await api.post<TeacherOTPResponse>(MemoApis.LOGIN_TEACHER, { teacherId: request.teacherId })
            return response.data
        }
    })
}

interface StudentOTPRequest {
    studentId: string
}
interface StudentOTPResponse {
    data: {
        emailStudent: string
    }
}

export function useStudentOTPMutation(): UseMutationResult<StudentOTPResponse, AxiosError, StudentOTPRequest> {
    return useMutation<StudentOTPResponse, AxiosError, StudentOTPRequest>({
        mutationFn: async (request) => {
            if (MemoConfig.isMock) return mockUseStudentOTP

            const response = await api.post<StudentOTPResponse>(MemoApis.LOGIN_STUDENT, { studentId: request.studentId })
            return response.data
        }
    })
}

interface ParentOTPRequest {
    phoneNumber: string
}
interface ParentOTPResponse {
    data: {
        emailParent: string
    }
}

export function useParentOTPMutation(): UseMutationResult<ParentOTPResponse, AxiosError, ParentOTPRequest> {
    return useMutation<ParentOTPResponse, AxiosError, ParentOTPRequest>({
        mutationFn: async (request) => {
            if (MemoConfig.isMock) return mockUseParentOTP

            const response = await api.post<ParentOTPResponse>(MemoApis.LOGIN_PARENT, { phoneNumber: request.phoneNumber })
            return response.data
        }
    })
}

