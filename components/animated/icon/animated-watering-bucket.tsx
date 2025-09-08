import WateringBucketSvg from "@/components/ui/icons/milestone/watering-bucket-svg";
import { PouringStatus } from "@/shared/types/milestone-type";
import { memo, useEffect } from "react";
import Animated, { FadeIn, Easing, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

interface AnimatedDropProps {
    pouring: PouringStatus
    onSuccess?: () => void
}

function AnimatedWateringBucket({ pouring, onSuccess }: Readonly<AnimatedDropProps>) {
    const rotate = useSharedValue(0)
    const fadeDelay = 300

    useEffect(() => {
        rotate.value = 0; // Reset before animation starts

        rotate.value = withDelay(
            fadeDelay,
            withTiming(-45, {
              duration: 500,
              easing: Easing.inOut(Easing.quad),
            }, () => {
              if (onSuccess) runOnJS(onSuccess)();
            })
        );
    }, [pouring, rotate, onSuccess]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotate.value}deg` }]
    }));

    return (
        <Animated.View 
            entering={FadeIn.duration(fadeDelay)}
            style={animatedStyle}
        >
            <WateringBucketSvg size={100} />
        </Animated.View>
    )
}

export default memo(AnimatedWateringBucket)