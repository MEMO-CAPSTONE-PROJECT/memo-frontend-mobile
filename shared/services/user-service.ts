import { MemoKey } from "@/constants/key";
import StorageServiceInstance from "@/shared/services/storage-service";
import { StudentUser, TeacherUser } from "@/shared/types/user-type";
import { jwtDecode } from "jwt-decode";

class TokenService {

    async getTeacher(): Promise<TeacherUser | null> {
        const token = await StorageServiceInstance.getItem(MemoKey.JWT_ACCESS_TOKEN)
        return token ? jwtDecode<TeacherUser>(token) : null
    }

    async getStudent(): Promise<StudentUser | null> {
        const token = await StorageServiceInstance.getItem(MemoKey.JWT_ACCESS_TOKEN)
        return token ? jwtDecode<StudentUser>(token) : null
    }

    async getParent(): Promise<TeacherUser | null> {
        const token = await StorageServiceInstance.getItem(MemoKey.JWT_ACCESS_TOKEN)
        return token ? jwtDecode<TeacherUser>(token) : null
    }
}

const TokenServiceInstance = new TokenService()
export default TokenServiceInstance