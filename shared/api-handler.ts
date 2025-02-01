import { MemoBaseURL } from "@/constants/apis";
import { MemoKey } from "@/constants/key";
import StorageServiceInstance from "@/shared/services/storage-service";
import axios from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";

const api = axios.create({
    baseURL: MemoBaseURL.PUBLIC
})

api.interceptors.request.use(
    async config => {
        const value = await StorageServiceInstance.getItem(MemoKey.JWT_ACCESS_TOKEN)
        
        if (!config.headers.Authorization && value)
            config.headers.Authorization = `Bearer ${value}`
        return config
    },
    error => {
        console.log("Request " + error);
        router.navigate("/")
        return error
    }
)

function logout() {
    StorageServiceInstance.deleteItem(MemoKey.JWT_ACCESS_TOKEN)
    router.push("/")
}

api.interceptors.response.use(
    async config => config,
    error => {
        if (error?.code === "ERR_NETWORK"){
            Alert.alert("เกิดข้อผิดพลาดสัญญาณอินเตอร์เน็ต","กรุณาเช็คสัญญาณอินเตอร์เน็ต", [
                {
                    text: "กลับสู่หน้าล็อกอิน",
                    onPress: logout
                },
            ])
        } else if (error?.status === 401) {
            Alert.alert("เซสซันนี้หมดเวลาการใช้งาน","กรุณาล็อกอินอีกครั้ง", [
                {
                    text: "กลับสู่หน้าล็อกอิน",
                    onPress: logout
                },
            ])
        } 

        return error
    }
)

export default api