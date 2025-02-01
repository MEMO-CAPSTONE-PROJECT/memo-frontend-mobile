import MemoTabBar from "@/components/bar/memo-tabbar"
import { useAuth } from "@/context/useAuth"
import { Redirect } from "expo-router"
import { House, UserCircle } from "phosphor-react-native"

export default function ParentTabsLayout() {
    const { isAuthenticated } = useAuth()
    if (!isAuthenticated) {
        return <Redirect href="/parent/(auth)/login" />
    }
    const tabs = [
        { route: "home", title: "หน้าหลัก", icon: House },
        { route: "profile", title: "โปรไฟล์", icon: UserCircle },
    ]
    return (<MemoTabBar tabs={tabs}/>)
}