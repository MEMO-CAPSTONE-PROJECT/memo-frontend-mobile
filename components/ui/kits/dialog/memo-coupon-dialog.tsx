import MemoButton from "@/components/button/memo-button";
import MemoDialog from "@/components/dialog/memo-dialog";
import MemoTextInput from "@/components/input/memo-text-input";
import { Text } from "react-native";

interface MemoCouponDialogProps {
    children: React.ReactNode
}

export default function MemoCouponDialog({ children }: Readonly<MemoCouponDialogProps>) {
    return (
        <MemoDialog 
            key={"memo-coupon-dialog"}
            button={children}
            snapPoints={[256,190]}
            snapPointsMode="constant"
        >
            <Text className="font-kanit-bold text-title text-title-1">กรอกชุดรหัสเพื่อรับคะแนน</Text>
            <MemoTextInput placeholder="s12f0d" />
            <MemoButton name="ยืนยัน" variant="primary" />
        </MemoDialog>
    )
}