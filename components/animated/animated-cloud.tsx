import CloudSvg from "@/components/ui/icons/milestone/cloud/cloud-svg";
import { useEffect } from "react";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

interface AnimatedCloudProps {
    startPosition: number;
    endPosition: number;
    size?: number;
    duration: number;
};

const useCloudAnimation = (duration: number, startPosition: number, endPosition: number) => {
    const translateX = useSharedValue(startPosition);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    useEffect(() => {
        translateX.value = withRepeat(
            withTiming(endPosition + startPosition, {
                duration: duration,
                easing: Easing.inOut(Easing.linear)
            }),
            -1, // Repeat forever
            false // Reverse the direction on each iteration
        );
    }, [startPosition, endPosition, duration, translateX]);

    return animatedStyle;
};

export default function AnimatedCloud({ startPosition, endPosition, size = 140, duration }: Readonly<AnimatedCloudProps>) {
    const animatedStyle = useCloudAnimation(duration, startPosition, endPosition);
    
    return (
        <Animated.View className="absolute h-full w-full" style={[animatedStyle]}>
            <CloudSvg size={size} className="absolute top-0 flex items-end w-full"/>
            <CloudSvg size={size} className="absolute top-32 flex items-start w-full"/>
            <CloudSvg size={size} className="absolute bottom-0 flex items-center w-full"/>
        </Animated.View>
    );
};
