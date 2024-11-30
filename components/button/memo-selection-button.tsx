import { Text, TouchableOpacity, View } from "react-native";

interface MemoSelectionButtonProps {
    buttons: MemoSelectionButtonItem[]
}

interface MemoSelectionButtonItem {
    name: string,
    active: boolean,
    onPress: () => void
}

export default function MemoSelectionButton({ buttons }: Readonly<MemoSelectionButtonProps>) {
    const states = {
        default: { container: "", text: "font-kanit-medium text-body text-system-white" },
        active: { container: "bg-system-white", text: "font-kanit-medium text-body text-primary-2" }
    }
    return (
        <View className="flex-row justify-between items-center h-4xl rounded-sm bg-primary-2 p-2xsm">
            {buttons.map(({ name, active, onPress }, index) =>
                <TouchableOpacity 
                    onPress={onPress} 
                    className={`h-full w-full flex-1 justify-center rounded-[8px] ${active ? states.active.container : states.default.container}`} 
                    key={name}
                >
                    <Text className={`text-center ${active ? states.active.text : states.default.text}`}>{name}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}