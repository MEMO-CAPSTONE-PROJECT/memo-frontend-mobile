
import MemoAppBar from "@/components/bar/memo-appbar";

export default function StudentAptitudeLayout() {
    const stacks = [
        { title: () => "วิเคราะห์ศักยภาพ", route: "index"},
        { title: () => "ความสามารถที่โดดเด่น", route: "overall" },
        { title: () => "ต้นไม้แห่งการเติบโต", route: "milestone" },
        { title: (params: any) => params?.type?.toString() ?? "ต้นไม้แห่งการเติบโต", route: "milestone/[id]" },
    ]
    return (<MemoAppBar stacks={stacks}/>)
}