import MemoAppBar from "@/components/bar/memo-appbar";

export default function ParentHomeLayout() {
    const stacks = [
        { title: () => "หน้าหลัก", route: "index" },
        { title: () => "ความสามารถที่โดดเด่น", route: "overall" },

    ]
    return (<MemoAppBar stacks={stacks}/>)
}