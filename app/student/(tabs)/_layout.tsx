import MemoTabBar from "@/components/bar/memo-tabbar";
import { ChartDonut, Heart, House, Trophy, UserCircle } from "phosphor-react-native";

export default function StudentTabsLayout() {
    const tabs = [
        { route: "home", title: "หน้าหลัก", icon: House },
        { route: "heart", title: "เป้าหมาย", icon: Heart },
        { route: "aptitude", title: "ศักยภาพ", icon: ChartDonut },
        { route: "rank", title: "จัดอันดับ", icon: Trophy },
        { route: "profile", title: "โปรไฟล์", icon: UserCircle },
    ]
    return (<MemoTabBar tabs={tabs}/>)
}