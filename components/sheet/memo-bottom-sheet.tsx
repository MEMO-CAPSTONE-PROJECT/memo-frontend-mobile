import { View } from "react-native";
import { Adapt, Dialog, Sheet, SnapPointsMode } from "tamagui";

interface MemoBottomSheetProps {
    id: string
    snapPoints?: number[]
    snapPointsMode?: SnapPointsMode
    button?: React.ReactNode
    children?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
}
export default function MemoBottomSheet({ id, button, children, snapPoints, snapPointsMode, open, onOpenChange }: Readonly<MemoBottomSheetProps>) {
    return (
        <Dialog open={open} key={id} onOpenChange={onOpenChange} modal>
            <Dialog.Trigger asChild>
                {button}
            </Dialog.Trigger>
            <Adapt when="sm" platform="touch">
                <Sheet 
                    animation="quick"
                    zIndex={200000} 
                    modal 
                    dismissOnSnapToBottom
                    disableDrag={true}
                    snapPoints={snapPoints}
                    snapPointsMode={snapPointsMode}
                >
                    <Sheet.Frame padding="$3" gap="$3" paddingBottom="$8">
                        <View 
                            className="w-10 h-1 bg-system-gray rounded-circle self-center"                           
                        />
                        <Adapt.Contents/>
                    </Sheet.Frame>
                    <Sheet.Overlay/>
                </Sheet>
            </Adapt>
            <Dialog.Portal>
                <Dialog.Overlay key={`${id}-overlay`} /> 
                <Dialog.Content key={`${id}-content`}> 
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    )
}