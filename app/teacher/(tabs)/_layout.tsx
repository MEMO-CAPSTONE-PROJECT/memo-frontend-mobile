import MemoTabBar from "@/components/bar/memo-tabbar";
import { useAuth } from "@/context/useAuth";
import { Redirect } from "expo-router";
import { ChartDonut, House, UserCircle } from "phosphor-react-native";

export default function TeacherTabsLayout() {
    const { isAuthenticated } = useAuth()
    if (!isAuthenticated) {
        return <Redirect href="/teacher/(auth)/login" />
    }
    const tabs = [
        { route: "home", title: "หน้าหลัก", icon: House },
        { route: "analysis", title: "วิเคราะห์เป้าหมาย", icon: ChartDonut },
        { route: "profile", title: "โปรไฟล์", icon: UserCircle },
    ]
    return (<MemoTabBar tabs={tabs} />)
}