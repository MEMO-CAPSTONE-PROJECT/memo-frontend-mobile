
import MemoAppBar from "@/components/bar/memo-appbar";
import { FormProvider } from "@/context/useForm";
import { UpsertAchievementForm } from "@/hooks/achievement/useUpsertAchievement";

export default function StudentHomeLayout() {
    const stacks = [
        { title: () => "หน้าหลัก", route: "index"},
        { title: (params: any) => params?.name?.toString(), route: "detail" },
        { title: () => "ตั้งเป้าหมายใหม่", route: "create" },
        { title: () => "แก้ไขเป้าหมาย", route: "edit" },
        { title: () => "QR สำหรับให้คะแนน", route: "qr-code"}
    ]
    return (
        <FormProvider<UpsertAchievementForm> initialValues={{
            name: "",
            amount: "",
            startDate: new Date(),
            endDate: new Date(),
            points: [{ id: "", normal: "", excellent: "" }],
            description: ""
        }}>
            <MemoAppBar stacks={stacks}/>
        </FormProvider>
    )
}