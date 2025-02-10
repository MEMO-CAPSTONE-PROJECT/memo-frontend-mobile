import { Color } from "@/constants/theme/color"
import { memo } from "react"
import { Text, View } from "react-native"

interface MemoProgressBarProps {
    progress: number
    height?: number
    backgroundColor?: string
    fillColor?: string
    textColor?: string
    className?: string
}

function MemoProgressBar({
    progress,
    height = 14,
    backgroundColor = Color["system-light-gray"],
    fillColor = Color["primary-2"],
    textColor = Color["system-white"],
    className = ""
}: Readonly<MemoProgressBarProps>) {
    const clampedProgress = Math.min(Math.max(progress, 0), 100)

    return (
        <View
            className={`w-full h-fit rounded-md ${className}`}
            style={{
                height,
                backgroundColor
            }}
        >
            <View
                className="relative h-full flex-row rounded-md"
                style={{
                    width: `${clampedProgress}%`,
                    backgroundColor: fillColor,
                }}
            >
                <View className="w-full h-full absolute justify-center items-center">
                    <Text
                        className="absolute font-kanit-bold text-caption-1"
                        style={{ color: textColor }}
                    >
                        {clampedProgress.toFixed(0)}%
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default memo(MemoProgressBar)