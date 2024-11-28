import { MemoBaseURL } from "@/constants/apis";
import { MemoKey } from "@/constants/key";
import StorageServiceInstance from "@/shared/services/storage-service";
import axios from "axios";

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
        return error
    }
)

export default api