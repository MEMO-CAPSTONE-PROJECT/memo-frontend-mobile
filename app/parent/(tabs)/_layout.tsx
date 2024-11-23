import MemoTabBar from "@/components/bar/memo-tabbar"
import { House, UserCircle } from "phosphor-react-native"

export default function ParentTabsLayout() {
    const tabs = [
        { route: "home", title: "หน้าหลัก", icon: House },
        { route: "profile", title: "โปรไฟล์", icon: UserCircle },
    ]
    return (<MemoTabBar tabs={tabs}/>)
}