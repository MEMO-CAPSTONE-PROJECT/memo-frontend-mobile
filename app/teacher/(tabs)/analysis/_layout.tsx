
import MemoAppBar from "@/components/bar/memo-appbar";

export default function TeacherAnalysisLayout() {
    const stacks = [
        { title: () => "วิเคราะห์เป้าหมาย", route: "index"},
    ]
    return (<MemoAppBar stacks={stacks}/>)
}