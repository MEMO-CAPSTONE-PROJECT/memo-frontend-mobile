
import MemoAppBar from "@/components/bar/memo-appbar";

export default function StudentRankLayout() {
    const stacks = [
        { title: () => "จัดอันดับ", route: "index"},
    ]
    return (<MemoAppBar stacks={stacks}/>)
}