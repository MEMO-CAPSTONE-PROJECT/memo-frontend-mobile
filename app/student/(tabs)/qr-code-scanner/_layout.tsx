
import MemoAppBar from "@/components/bar/memo-appbar";

export default function StudentHeartLayout() {
    const stacks = [
        { title: () => "สแกน QR เพื่อรับคะแนน", route: "index"},
    ]
    return (<MemoAppBar stacks={stacks}/>)
}