import { Color } from "@/constants/theme/color"
import { Minus } from "phosphor-react-native"
import { TouchableOpacity } from "react-native"

interface MemoDeleteButtonProps {
    onPress?: () => void
}

export default function MemoDeleteButton({ onPress }: Readonly<MemoDeleteButtonProps>) {
    return (
        <TouchableOpacity onPress={onPress} className="bg-system-error rounded-xsm justify-center items-center p-xsm">
            <Minus color={Color["system-white"]} size={20} weight="bold" />
        </TouchableOpacity>
    )
}