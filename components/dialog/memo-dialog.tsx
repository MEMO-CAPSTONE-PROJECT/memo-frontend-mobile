import { Adapt, Dialog, Sheet, SnapPointsMode } from "tamagui";

interface MemoDialogProps {
    key: string
    snapPoints?: number[]
    snapPointsMode?: SnapPointsMode
    button?: React.ReactNode
    children?: React.ReactNode
}
export default function MemoDialog({ key, button, children, snapPoints, snapPointsMode }: Readonly<MemoDialogProps>) {
    return (
        <Dialog key={key} modal>
            <Dialog.Trigger asChild>
                {button}
            </Dialog.Trigger>
            <Adapt when="sm" platform="touch">
                <Sheet 
                    animation="medium" 
                    zIndex={200000} 
                    modal 
                    dismissOnSnapToBottom
                    snapPoints={snapPoints}
                    snapPointsMode={snapPointsMode}
                >
                    <Sheet.Frame padding="$4" gap="$4">
                        <Adapt.Contents/>
                    </Sheet.Frame>
                    <Sheet.Overlay
                        animation="lazy"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                </Sheet>
            </Adapt>
            <Dialog.Portal>
                <Dialog.Overlay key={`${key}-overlay`} /> 
                <Dialog.Content key={`${key}-content`}> 
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    )
}