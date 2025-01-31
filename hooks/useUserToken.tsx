import UserServiceInstance from "@/shared/services/user-service";
import { useQuery } from "@tanstack/react-query";

export function useStudentToken() {
    return useQuery({
        queryKey: ["studentToken"],
        queryFn: UserServiceInstance.getStudent
    })
}

export function useTeacherToken() {
    return useQuery({
        queryKey: ["teacherToken"],
        queryFn: UserServiceInstance.getTeacher
    })
}

export function useParentToken() {
    return useQuery({
        queryKey: ["parentToken"],
        queryFn: UserServiceInstance.getParent
    })
}
