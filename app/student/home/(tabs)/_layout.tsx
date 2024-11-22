import MemoTabBar from "@/components/bar/memo-tabbar";
import { ChartDonut, Heart, House, Trophy, UserCircle } from "phosphor-react-native";

export default function StudentTabsLayout() {
    const tabs = [
        { route: "index", title: "หน้าหลัก", Icon: House },
        { route: "heart", title: "เป้าหมาย", Icon: Heart },
        { route: "aptitude", title: "ศักยภาพ", Icon: ChartDonut },
        { route: "rank", title: "จัดอันดับ", Icon: Trophy },
        { route: "profile", title: "โปรไฟล์", Icon: UserCircle },
    ]
    return (<MemoTabBar tabs={tabs}/>)
}