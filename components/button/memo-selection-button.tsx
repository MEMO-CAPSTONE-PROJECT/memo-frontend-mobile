import { Text, TouchableOpacity } from "react-native";
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
        default: { container: "border-xsm border-system-gray", text: "text-body-2" },
        active: { container: "bg-primary-2", text: "text-system-white" }
    }
    return (
        <ScrollableView border={false} horizontal className="flex-row justify-between items-center h-3xl rounded-sm gap-x-md">
            {buttons.map(({ name, active, onPress }) =>
                <TouchableOpacity
                    onPress={onPress}
                    className={`h-full w-full flex-1 justify-center rounded-circle px-lg ${active ? states.active.container : states.default.container}`}
                    key={name}
                >
                    <Text className={`text-center font-kanit-medium text-caption-1 ${active ? states.active.text : states.default.text}`}>{name}</Text>
                </TouchableOpacity>
            )}
            {children}
        </ScrollableView>
    )
}
