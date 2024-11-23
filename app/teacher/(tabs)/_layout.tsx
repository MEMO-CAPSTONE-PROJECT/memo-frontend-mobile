import MemoTabBar from "@/components/bar/memo-tabbar";
import { ChartDonut, House, UserCircle } from "phosphor-react-native";

export default function TeacherTabsLayout() {
    const tabs = [
        { route: "home", title: "หน้าหลัก", icon: House },
        { route: "analysis", title: "วิเคราะห์เป้าหมาย", icon: ChartDonut },
        { route: "profile", title: "โปรไฟล์", icon: UserCircle },
    ]
    return (<MemoTabBar tabs={tabs} />)
}