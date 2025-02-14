import { Color } from "@/constants/theme/color";
import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

interface ScrollableViewProps {
    horizontal?: boolean
    border?: boolean
    gap?: boolean
    scrollEnabled?: boolean
    containerClassName?: string
    className?: string
    showScrollIndicator?: boolean
    children: React.ReactNode
    onRefresh?: () => void
}

export default function ScrollableView({ 
    gap = false, 
    horizontal = false, 
    showScrollIndicator = true, 
    border = true, 
    scrollEnabled = true, 
    className, containerClassName, children, onRefresh 
}: Readonly<ScrollableViewProps>) {
    const [refreshing, setRefreshing] = useState(false)
    
    async function handleRefresh() {
        setRefreshing(true)
        await onRefresh?.()
        setRefreshing(false)
    }

    const getBorder = () => {
        if (border) {
            if (scrollEnabled && !horizontal) 
                return "border-b-xsm border-b-body-2"
            else if (scrollEnabled && horizontal)
                return "border-r-xsm border-r-body-2"
        }
        return ""
    }
    return (
        <ScrollView
            horizontal={horizontal}
            showsHorizontalScrollIndicator={showScrollIndicator}
            showsVerticalScrollIndicator={showScrollIndicator}
            scrollEnabled={scrollEnabled}
            contentContainerClassName={containerClassName}
            className={`${gap ? "mb-lg" : ""} ${getBorder()}`}
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