import { forwardRef } from "react"
import { GestureResponderEvent, Pressable, Text, View } from "react-native"

interface MemoTextButtonProps {
    name: string
    onPress?: (event: GestureResponderEvent) => void
}

const MemoTextButton = forwardRef<View, MemoTextButtonProps>(({ onPress, name }, ref) => {
    return (
        <Pressable onPress={onPress} className={`hover:ease-in hover:duration-150 hover:text-primary-2`} ref={ref}>
            <Text className={`font-kanit-regular underline text-caption-1 text-title-1 pointer-events-none`}>{name}</Text>
        </Pressable>
    )
})

MemoTextButton.displayName = "MemoTextButton"

export default MemoTextButton