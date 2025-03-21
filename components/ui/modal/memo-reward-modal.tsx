import MemoButton from "@/components/button/memo-button"
import MedalSvg from "@/components/ui/icons/medal-svg"
import { useModal } from "@/context/useModal"
import { StudentScore } from "@/shared/types/achievement-type"
import { Text, View } from "react-native"

interface MemoRewardModalProps {
    rewards?: StudentScore[]
    onSubmit?: (code: string) => void
    // children
}

export default function MemoRewardModal({ rewards }: Readonly<MemoRewardModalProps>) {
    const { hideModal } = useModal()
    return (
        <View className="flex-1 justify-center items-center px-3xl gap-y-2xl">
            <View className="w-[165px] h-[165px] justify-center items-center bg-system-light-blue rounded-circle">
                <MedalSvg size={128} />
            </View>
            <View className="flex-col items-center">
                <Text className="font-kanit-bold text-caption-1 text-body-1">ยินดีด้วยคุณได้รับรางวัล</Text>
                {rewards?.map((reward) => (
                    <Text key={reward.type} className="font-kanit-bold text-title text-primary-2">+ {reward.score} คะแนน{reward.type}</Text>
                ))}
            </View>
            <MemoButton name="ยืนยัน" variant="primary" onPress={hideModal} />
        </View>
    )
}