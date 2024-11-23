
import MemoAppBar from "@/components/bar/memo-appbar";

export default function StudentHeartLayout() {
    const stacks = [
        { title: () => "เป้าหมาย", route: "index"},
    ]
    return (<MemoAppBar stacks={stacks}/>)
}