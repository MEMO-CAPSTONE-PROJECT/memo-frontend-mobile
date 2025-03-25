import MemoAppBar from "@/components/bar/memo-appbar";

export default function ParentHomeLayout() {
    const stacks = [
        { title: () => "หน้าหลัก", route: "index" },
        { title: () => "ความสามารถที่โดดเด่น", route: "overall" },
        { title: () => "วิเคราะห์การเข้าร่วมกิจกรรม", route: "summary" }, 
    ]
    return (<MemoAppBar stacks={stacks}/>)
}