import { Text, TouchableOpacity, View } from "react-native";
import ScrollableView from "../scrollable/scrollable-view";

interface MemoSelectionButtonProps {
    buttons: MemoSelectionButtonItem[]
    children?: React.ReactNode
}

interface MemoSelectionButtonItem {
    name: string,
    active: boolean,
    onPress: () => void
}

export default function MemoSelectionButton({ buttons, children }: Readonly<MemoSelectionButtonProps>) {
    const states = {
        default: { container: "bg-system-light-gray", text: "font-kanit-medium text-caption-1 text-body-1" },
        active: { container: "bg-primary-2", text: "font-kanit-medium text-caption-1 text-system-white" }
    }
    return (
        <ScrollableView border={false} horizontal className="flex-row justify-between items-center h-4xl rounded-sm gap-x-lg">
            {buttons.map(({ name, active, onPress }, index) =>
                <TouchableOpacity
                    onPress={onPress}
                    className={`h-full w-full flex-1 justify-center rounded-circle px-lg ${active ? states.active.container : states.default.container}`}
                    key={name}
                >
                    <Text className={`text-center ${active ? states.active.text : states.default.text}`}>{name}</Text>
                </TouchableOpacity>
            )}
            {children}
        </ScrollableView>
    )
}
