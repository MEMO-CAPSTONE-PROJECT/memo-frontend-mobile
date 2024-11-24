
import MemoAppBar from "@/components/bar/memo-appbar";

export default function StudentAptitudeLayout() {
    const stacks = [
        { title: () => "ศักยภาพ", route: "index"},
        { title: () => "ความสามารถที่โดดเด่น", route: "overall" }
    ]
    return (<MemoAppBar stacks={stacks}/>)
}