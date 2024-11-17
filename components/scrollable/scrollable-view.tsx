import { ScrollView, View } from "react-native";

interface ScrollableViewProps {
    scrollEnabled?: boolean
    className?: string
    children: React.ReactNode
}

export default function ScrollableView({ scrollEnabled = true, className, children }: Readonly<ScrollableViewProps>) {
    return (
        <ScrollView
            scrollEnabled={scrollEnabled}
            className={`mb-lg ${scrollEnabled ? "border-b-xsm border-b-body-2" : ""}`}
        >
            <View className={className}>
                {children}
            </View>
        </ScrollView>
    )
}