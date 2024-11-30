import { forwardRef } from "react"
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native"

interface MemoTextButtonProps {
    name: string
    disabled?: boolean
    onPress?: (event: GestureResponderEvent) => void
}

const MemoTextButton = forwardRef<TouchableOpacity, MemoTextButtonProps>(({ onPress, name, disabled = false }, ref) => {
    return (
        <TouchableOpacity onPress={onPress} className={`hover:ease-in hover:duration-150 hover:text-primary-2`} ref={ref} disabled={disabled}>
            <Text className={`font-kanit-regular underline text-caption-1 pointer-events-none ${disabled ? "text-body-2" : "text-title-1"}`}>{name}</Text>
        </TouchableOpacity>
    )
})

MemoTextButton.displayName = "MemoTextButton"

export default MemoTextButton