import { MemoApis } from "@/constants/apis"
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

function useTeacherOTP(): UseMutationResult<TeacherOTPResponse, AxiosError, TeacherOTPRequest> {

    return useMutation<TeacherOTPResponse, AxiosError, TeacherOTPRequest>({
        mutationFn: async (request) => {
            if (MemoConfig.isMock) return { data: { emailTeacher: "duangcharoen@gmail.com" } }

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

function useStudentOTP(): UseMutationResult<StudentOTPResponse, AxiosError, StudentOTPRequest> {

    return useMutation<StudentOTPResponse, AxiosError, StudentOTPRequest>({
        mutationFn: async (request) => {
            if (MemoConfig.isMock) return { data: { emailStudent: "duangcharoen@gmail.com" } }

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

function useParentOTP(): UseMutationResult<ParentOTPResponse, AxiosError, ParentOTPRequest> {
    return useMutation<ParentOTPResponse, AxiosError, ParentOTPRequest>({
        mutationFn: async (request) => {
            if (MemoConfig.isMock) return { data: { emailParent: "duangcharoen@gmail.com" } }

            const response = await api.post<ParentOTPResponse>(MemoApis.LOGIN_PARENT, { phoneNumber: request.phoneNumber })
            return response.data
        }
    })
}

export { useParentOTP, useStudentOTP, useTeacherOTP }
