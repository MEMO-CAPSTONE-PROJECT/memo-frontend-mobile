import MemoAppBar from "@/components/bar/memo-appbar";

export default function ParentHomeLayout() {
    const stacks = [
        { title: () => "หน้าหลัก", route: "index" },
    ]
    return (<MemoAppBar stacks={stacks}/>)
}