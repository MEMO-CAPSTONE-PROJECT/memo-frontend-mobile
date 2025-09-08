
import MemoAppBar from "@/components/bar/memo-appbar";

export default function StudentProfileLayout() {
    const stacks = [
        { title: () => "โปรไฟล์", route: "index"},
    ]
    return (<MemoAppBar stacks={stacks}/>)
}