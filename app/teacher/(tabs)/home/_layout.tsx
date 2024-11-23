
import MemoAppBar from "@/components/bar/memo-appbar";

export default function StudentHomeLayout() {
    const stacks = [
        { title: () => "หน้าหลัก", route: "index"},
    ]
    return (<MemoAppBar stacks={stacks}/>)
}