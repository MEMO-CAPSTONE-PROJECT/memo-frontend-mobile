import { Color } from "@/constants/theme/color";
import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

interface ScrollableViewProps {
    border?: boolean
    gap?: boolean
    scrollEnabled?: boolean
    className?: string
    children: React.ReactNode
    onRefresh?: () => void
}

export default function ScrollableView({ gap = false, border = true, scrollEnabled = true, className, children, onRefresh }: Readonly<ScrollableViewProps>) {
    const [refreshing, setRefreshing] = useState(false)
    
    async function handleRefresh() {
        setRefreshing(true)
        await onRefresh?.()
        setRefreshing(false)
    }
    return (
        <ScrollView
            scrollEnabled={scrollEnabled}
            className={`${gap ? "mb-lg" : ""} ${border && scrollEnabled ? "border-b-xsm border-b-body-2" : ""}`}
            refreshControl={onRefresh ? (
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={['grey']}
                    progressBackgroundColor={Color["title-1"]}
                />
            ) : undefined}
        >
            <View className={className}>
                {children}
            </View>
        </ScrollView>
    )
}