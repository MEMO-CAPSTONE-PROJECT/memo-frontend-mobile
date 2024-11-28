import SessionStorageInstance from "@/shared/session-storage"


class StorageService {

    async getItem(key: string) {
        return SessionStorageInstance.getItem(key)
        // return SecureStore.getItemAsync(key)
    }

    async deleteItem(key: string) {
        return SessionStorageInstance.removeItem(key)
        // return SecureStore.deleteItemAsync(key)
    }

    async setItem(key: string, value: string) {
        return SessionStorageInstance.setItem(key, value)
        // return SecureStore.setItemAsync(key, value)
    }
}
const StorageServiceInstance = new StorageService()
export default StorageServiceInstance