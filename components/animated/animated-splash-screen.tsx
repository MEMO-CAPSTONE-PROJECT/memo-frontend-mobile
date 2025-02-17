import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface AnimatedSplashScreenProps {
    image: any
    children: React.ReactNode
}

export default function AnimatedSplashScreen({ children, image }: Readonly<AnimatedSplashScreenProps>) {
    const opacity = useSharedValue(1)
    const scale = useSharedValue(1)
    const [isAppReady, setIsAppReady] = useState(false)
    const [isSplashAnimationComplete, setIsSplashAnimationComplete] = useState(false)
  
    useEffect(() => {
      if (isAppReady) {
        opacity.value = withTiming(0, { duration: 1000 }, () => {
          runOnJS(setIsSplashAnimationComplete)(true);
        });
        scale.value = withTiming(0, { duration: 1000 });
      }
    }, [opacity, scale, isAppReady])
  
    const onImageLoaded = useCallback(async () => {
      try {
        await SplashScreen.hideAsync()
        // Load stuff
        await Promise.all([])
        /* eslint-disable */ //
      } catch (e) {
        // Do nothing
        /* eslint-enable */ //
      } finally {
        setIsAppReady(true)
      }
    }, [])
  
    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));
    const imageAnimatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    }));


    return (
      <View style={{ flex: 1 }}>
        {isAppReady && children}
        {!isSplashAnimationComplete && (
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: Constants.expoConfig?.splash?.backgroundColor,
              },
              animatedStyle,
            ]}
          >
            <Animated.Image
              style={[{
                width: "100%",
                height: "100%",
                resizeMode: Constants.expoConfig?.splash?.resizeMode ?? "contain",
              }, imageAnimatedStyle]}
              source={image}
              onLoadEnd={onImageLoaded}
              fadeDuration={0}
            />
          </Animated.View>
        )}
      </View>
    )
  }