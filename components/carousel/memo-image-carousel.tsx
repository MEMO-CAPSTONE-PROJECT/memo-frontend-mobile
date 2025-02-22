import MemoImage from "@/components/carousel/memo-image";
import { MemoCase, MemoSwitch } from "@/components/logic/memo-switch";
import useImagePreview from "@/hooks/image/useImagePreview";
import { BaseURL } from "@/shared/api-handler";
import { useState } from "react";
import { ImageURISource, Text, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface MemoImageCarouselProps {
    indicator?: boolean
    baseUrl?: string
    height?: number
    images: ImageURISource[]
}

export default function MemoImageCarousel({ images, height = 200, baseUrl = BaseURL, indicator = true }: Readonly<MemoImageCarouselProps>) {
    const { width: SCREEN_WIDTH } = useWindowDimensions();
    const [displayIndex, setDisplayIndex] = useState(0)
    const { handleImagePreview } = useImagePreview(images, baseUrl)
    const formattedUri = (uri?: string) => baseUrl + uri

    const translateX = useSharedValue(0)
    const currentIndex = useSharedValue(0)

    useAnimatedReaction(() => currentIndex.value, (index) => {
        runOnJS(setDisplayIndex)(index)
    }, [currentIndex])

    const handlePanGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = -currentIndex.value * SCREEN_WIDTH + event.translationX
        })
        .onEnd((event) => {
            const offset = event.translationX
            const threshold = SCREEN_WIDTH / 8

            if (Math.abs(offset) > threshold) {
                if (offset > 0 && currentIndex.value > 0) 
                    currentIndex.value -= 1
                else if (offset < 0 && currentIndex.value < images.length - 1)
                    currentIndex.value += 1
            }

            translateX.value = withSpring(-currentIndex.value * SCREEN_WIDTH)
        })

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }]
    }))

    return (
        <View>
            {/* Display index indicator */}
            {(indicator && images.length > 1) && 
                <MemoImageNumberIndicator 
                    index={displayIndex} 
                    total={images.length} 
                />
            }
            <MemoSwitch test={images.length}>
                <MemoCase value={(test) => test === 1}>
                    <MemoImage
                        width={SCREEN_WIDTH}
                        height={height}
                        uri={formattedUri(images[0].uri)}
                        onPress={() => handleImagePreview(0)}
                    />
                </MemoCase>
                <MemoCase default>
                    <GestureDetector gesture={handlePanGesture}>
                        <Animated.View
                            className="flex-row relative"
                            style={[{ width: SCREEN_WIDTH * images.length }, animatedStyle]}
                        >
                            {images.map((image, index) => (
                                <MemoImage
                                    key={"image_" + index}
                                    width={SCREEN_WIDTH}
                                    height={height}
                                    uri={formattedUri(image.uri)}
                                    onPress={() => handleImagePreview(index)}
                                />
                            ))}
                        </Animated.View>
                    </GestureDetector>
                </MemoCase>
            </MemoSwitch>
        </View>
    )
}

interface MemoImageNumberIndicatorProps {
    index: number
    total: number
}

function MemoImageNumberIndicator({ index, total }: Readonly<MemoImageNumberIndicatorProps>) {
    return (
        <View className="absolute pointer-events-none z-20 px-md rounded-md bg-title-1/50 top-4 right-4">
            <Text className="font-kanit-medium text-caption-2 text-system-white">{index + 1}/{total}</Text>
        </View>
    )
}