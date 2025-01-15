import { MemoBaseURL } from "@/constants/apis";
import { MemoKey } from "@/constants/key";
import StorageServiceInstance from "@/shared/services/storage-service";
import axios from "axios";
import { router } from "expo-router";

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
        console.log("Error " + error);
        router.navigate("/")
        return error
    }
)
api.interceptors.response.use(
    async config => config,
    error => {
        console.log(error)
        return error
    }
)

export default api