import { MemoKey } from "@/constants/key";
import { MemoConfig } from "@/shared/config";
import StorageServiceInstance from "@/shared/services/storage-service";
import { ParentUser, StudentUser, TeacherUser } from "@/shared/types/user-type";
import { jwtDecode } from "jwt-decode";

class UserService {

    async getTeacher(): Promise<TeacherUser | null> {
        if (MemoConfig.isMock) return { sub: "1", firstName: "ธัณย์นิชา", lastName: "สมภาร", position: "คุณครูผู้ดูแล", gender: "woman",classLevel: "4",classRoom: "5" }
        const token = await StorageServiceInstance.getItem(MemoKey.JWT_ACCESS_TOKEN)
        return token ? jwtDecode<TeacherUser>(token) : null
    }

    async getStudent(): Promise<StudentUser | null> {
        if (MemoConfig.isMock) return { sub: "2", firstName: "ธัณย์นิชา", lastName: "สมภาร", gender: "man",classLevel: "5",classRoom: "2" }
        const token = await StorageServiceInstance.getItem(MemoKey.JWT_ACCESS_TOKEN)
        return token ? jwtDecode<StudentUser>(token) : null
    }

    async getParent(): Promise<ParentUser | null> {
        if (MemoConfig.isMock) return { sub: "3", phoneNumber: "0812345678", firstName: "ธัณย์นิชา", lastName: "สมภาร", gender: "man" }
        const token = await StorageServiceInstance.getItem(MemoKey.JWT_ACCESS_TOKEN)
        return token ? jwtDecode<ParentUser>(token) : null
    }
}

const UserServiceInstance = new UserService()
export default UserServiceInstance