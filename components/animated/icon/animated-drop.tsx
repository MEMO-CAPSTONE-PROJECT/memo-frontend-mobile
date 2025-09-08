import { Color } from "@/constants/theme/color";
import { PouringStatus } from "@/shared/types/milestone-type";
import { Drop } from "phosphor-react-native";
import { memo, useEffect } from "react";
import Animated, { useAnimatedStyle, Easing, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from "react-native-reanimated";

interface AnimatedDropProps {
    rowIndex: number
    colIndex: number
    pouring: PouringStatus
}

function AnimatedDrop({ rowIndex, colIndex, pouring }: Readonly<AnimatedDropProps>) {
    const translateY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(0);

    useEffect(() => {
        const repeater = (sequence: number) => {
            return withRepeat(
                withDelay((rowIndex * 3 + colIndex) * 200, sequence), 1
            )
        }

        // Initiate the animation for drops once `isPouring` is true
        translateY.value = repeater(withSequence(
            withTiming(-50, { duration: 0 }), // Start slightly above
            withTiming(150, { duration: 2000, easing: Easing.inOut(Easing.quad) }), // Fall smoothly
            withTiming(150, { duration: 300 }) // Small pause at bottom before disappearing
        ))

        translateX.value = repeater(
            withSequence(
                withTiming(0),
                withTiming(colIndex % 2 ? 10 : -10, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
                withTiming(0, { duration: 0 })
            )
        )
        opacity.value = withSequence(
            withTiming(0, { duration: 300 }), // Fade in
            withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.quad) }), // Maintain opacity during fall
            withTiming(1, { duration: 300 }) // Fade out after the fall
        )

    }, [colIndex, rowIndex, opacity, translateY, translateX, pouring]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            { translateX: translateX.value },
        ],
        opacity: opacity.value,
    }));

    return (
        <Animated.View 
            style={animatedStyle}
        >
            <Drop color={Color["system-blue-2"]} weight="fill" size={16} />
        </Animated.View>
    )
}

export default memo(AnimatedDrop)