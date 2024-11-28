import MemoTabBar from "@/components/bar/memo-tabbar";
import { ChartDonut, House, QrCode, Trophy, UserCircle } from "phosphor-react-native";

export default function StudentTabsLayout() {
    const tabs = [
        { route: "home", title: "หน้าหลัก", icon: House },
        { route: "aptitude", title: "ศักยภาพ", icon: ChartDonut },
        { route: "qr-code-scanner", title: "สแกน QR เพื่อรับคะแนน", icon: QrCode },
        { route: "rank", title: "จัดอันดับ", icon: Trophy },
        { route: "profile", title: "โปรไฟล์", icon: UserCircle },
    ]
    return (<MemoTabBar tabs={tabs}/>)
}