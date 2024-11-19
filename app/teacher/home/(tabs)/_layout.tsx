import MemoTabBar from "@/components/bar/memo-tabbar";
import { House, ListChecks, Trophy, UserCircle } from "phosphor-react-native";

export default function TeacherTabsLayout() {
    const tabs = [
        { route: "index", title: "หน้าหลัก", Icon: House },
        { route: "goal", title: "เป้าหมาย", Icon: ListChecks },
        { route: "achievement", title: "รายการความสำเร็จ", Icon: Trophy },
        { route: "profile", title: "โปรไฟล์", Icon: UserCircle },
    ]
    return (<MemoTabBar tabs={tabs}/>)
}