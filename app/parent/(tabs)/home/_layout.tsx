import MemoAppBar from "@/components/bar/memo-appbar";

export default function ParentHomeLayout() {
    const stacks = [
        { title: () => "หน้าหลัก", route: "index" },
        { title: () => "ความสามารถที่โดดเด่น", route: "overall" },
        { title: () => "วิเคราะห์การเข้าร่วมกิจกรรม", route: "summary" }, 
        { title: () => "บุคลิกของนักเรียน", route: "character" }, 
        { title: (params: any) => params?.type?.toString() ?? "วิเคราะห์การเข้าร่วมกิจกรรม", route: "summary/[id]" },
    ]
    return (<MemoAppBar stacks={stacks}/>)
}