
import MemoAppBar from "@/components/bar/memo-appbar";

export default function StudentHomeLayout() {
    const stacks = [
        { title: () => "หน้าหลัก", route: "index"},
        { title: (params: any) => params?.name?.toString(), route: "detail" },
        { title: () => "ตั้งเป้าหมายใหม่", route: "create" },
        { title: () => "แก้ไขเป้าหมาย", route: "edit" },
        { title: () => "QR สำหรับให้คะแนน", route: "qr-code"}
    ]
    return (<MemoAppBar stacks={stacks}/>)
}