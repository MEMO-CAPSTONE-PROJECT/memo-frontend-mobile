
import MemoAppBar from "@/components/bar/memo-appbar";

export default function StudentAptitudeLayout() {
    const stacks = [
        { title: () => "ศักยภาพ", route: "index"},
    ]
    return (<MemoAppBar stacks={stacks}/>)
}