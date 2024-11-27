import { MEMO_BASE_URL } from "@/constants/apis"
import axios from "axios"

const api = axios.create({
    baseURL: MEMO_BASE_URL.public
})

api.interceptors.request.use(
    async config => {
        // const value = await Keychain.getGenericPassword()
        // if (!config.headers.Authorization && value)
        //     config.headers.Authorization = `Bearer ${value.password}`
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default api