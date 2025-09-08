
import MemoAppBar from "@/components/bar/memo-appbar";

export default function ParentProfileLayout() {
    const stacks = [
        { title: () => "โปรไฟล์", route: "index"},
    ]
    return (<MemoAppBar stacks={stacks}/>)
}