
import MemoAppBar from "@/components/bar/memo-appbar";

export default function TeacherProfileLayout() {
    const stacks = [
        { title: () => "โปรไฟล์", route: "index"},
    ]
    return (<MemoAppBar stacks={stacks}/>)
}