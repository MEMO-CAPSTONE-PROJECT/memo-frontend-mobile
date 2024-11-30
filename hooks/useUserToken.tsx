import UserServiceInstance from "@/shared/services/user-service";
import { useQuery } from "@tanstack/react-query";

function useStudentToken() {
    return useQuery({
        queryKey: ["studentToken"],
        queryFn: UserServiceInstance.getStudent
    })
}

function useTeacherToken() {
    return useQuery({
        queryKey: ["teacherToken"],
        queryFn: UserServiceInstance.getTeacher
    })
}

function useParentToken() {
    return useQuery({
        queryKey: ["parentToken"],
        queryFn: UserServiceInstance.getParent
    })
}

export { useParentToken, useStudentToken, useTeacherToken };
