import { MemoBaseURL } from "@/constants/apis";
import { MemoKey } from "@/constants/key";
import StorageServiceInstance from "@/shared/services/storage-service";
import axios from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";

export const BaseURL = MemoBaseURL.PUBLIC

let isAlertVisible = false; // Prevent stacking alert

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
    isAlertVisible = false; // Reset alert visibility when logging out
}

function alert(title: string, message: string, buttons: any[]) {
    if (isAlertVisible) return; // Prevent duplicate alerts
    isAlertVisible = true;

    const wrappedButtons = buttons.map(button => ({
        ...button,
        onPress: () => {
            isAlertVisible = false; // Reset when any button is pressed
            if (button.onPress) button.onPress();
        }
    }))

    Alert.alert(title, message, wrappedButtons, {
        onDismiss: () => {
            isAlertVisible = false; // Reset when dismissed
        }
    });
}

api.interceptors.response.use(
    async config => config,
    error => {
        console.log("Response code " + error?.code);
        console.log("Response " + error);
        
        if (error?.code === "ERR_NETWORK"){
            alert("เกิดข้อผิดพลาดสัญญาณอินเตอร์เน็ต","กรุณาเช็คสัญญาณอินเตอร์เน็ต", [
                {
                    text: "ลองใหม่อีกครั้ง",
                    style: "default"
                },
                {
                    text: "กลับสู่หน้าเริ่มต้น",
                    onPress: logout
                },
            ])
        } else if (error?.code === "ECONNABORTED") {
            alert("ระบบเซิฟเวอร์ล้มเหลว", "", [
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
            alert("เซสซันนี้หมดเวลาการใช้งาน","กรุณาล็อกอินอีกครั้ง", [
                {
                    text: "กลับสู่หน้าเริ่มต้น",
                    onPress: logout
                },
            ])
        } 

        return Promise.reject(error as Error)
    }
)

export default api