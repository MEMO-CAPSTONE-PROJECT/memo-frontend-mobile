import { MemoBaseURL } from "@/constants/apis";
import { MemoKey } from "@/constants/key";
import StorageServiceInstance from "@/shared/services/storage-service";
import axios from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";

export const BaseURL = MemoBaseURL.PUBLIC

const api = axios.create({
    baseURL: BaseURL
})

api.interceptors.request.use(
    async config => {
        config.timeout = 8000
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
    router.replace("/")
}

api.interceptors.response.use(
    async config => config,
    error => {
        console.log("Response code " + error?.code);
        console.log("Response " + error);
        
        if (error?.code === "ERR_NETWORK"){
            Alert.alert("เกิดข้อผิดพลาดสัญญาณอินเตอร์เน็ต","กรุณาเช็คสัญญาณอินเตอร์เน็ต", [
                {
                    text: "กลับสู่หน้าเริ่มต้น",
                    onPress: logout
                },
            ])
        } else if (error?.code === "ECONNABORTED") {
            Alert.alert("ระบบเซิฟเวอร์ล้มเหลว", "", [
                {
                    text: "ลองใหม่อีกครั้ง",
                    style: "default"
                },
                {
                    text: "กลับสู่หน้าเริ่มต้น",
                    style: "destructive",
                    onPress: logout
                }
            ])
        } else if (error?.status === 401) {
            Alert.alert("เซสซันนี้หมดเวลาการใช้งาน","กรุณาล็อกอินอีกครั้ง", [
                {
                    text: "กลับสู่หน้าเริ่มต้น",
                    onPress: logout
                },
            ])
        } 

        return error
    }
)

export default api