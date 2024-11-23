import MemoAppBar from "@/components/bar/memo-appbar";

export default function StudentHomeLayout() {
    const stacks = [
        { title: () => "หน้าหลัก", route: "index"},
        //DETAIL PARAMS: detail: "1", name: "แข่งเพชรยอดมงกุฎ"
        { title: (params: any) => params?.name?.toString(), route: "[detail]"},
    ]
    return (<MemoAppBar stacks={stacks}/>)
}