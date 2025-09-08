import { Text, TouchableOpacity, View } from "react-native";

interface MemoSwitchButtonProps {
    buttons: MemoSwitchButtonItem[]
    children?: React.ReactNode
}

interface MemoSwitchButtonItem {
    name: string,
    active: boolean,
    onPress: () => void
}

export default function MemoSwitchButton({ buttons, children }: Readonly<MemoSwitchButtonProps>) {
    const states = {
        default: { container: "", text: "font-kanit-medium text-caption-1 text-system-white" },
        active: { container: "bg-system-white", text: "font-kanit-medium text-caption-1 text-primary-2" }
    }
    return (
        <View className="h-fit w-full flex-row justify-between items-center rounded-sm bg-primary-2 border-xsm border-primary-2">
            {buttons.map(({ name, active, onPress }) =>
                <TouchableOpacity
                    onPress={onPress}
                    className={`flex-1 justify-center rounded-[8] p-md ${active ? states.active.container : states.default.container}`}
                    key={name}
                >
                    <Text className={`text-center ${active ? states.active.text : states.default.text}`}>{name}</Text>
                </TouchableOpacity>
            )}
            {children}
        </View>
    )
}
