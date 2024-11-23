import { ScrollView, View } from "react-native";

interface ScrollableViewProps {
    border?: boolean
    gap?: boolean
    scrollEnabled?: boolean
    className?: string
    children: React.ReactNode
}

export default function ScrollableView({ gap = false, border = true, scrollEnabled = true, className, children }: Readonly<ScrollableViewProps>) {
    return (
        <ScrollView
            scrollEnabled={scrollEnabled}
            className={`${gap ? "mb-lg" : ""} ${border && scrollEnabled ? "border-b-xsm border-b-body-2" : ""}`}
        >
            <View className={className}>
                {children}
            </View>
        </ScrollView>
    )
}