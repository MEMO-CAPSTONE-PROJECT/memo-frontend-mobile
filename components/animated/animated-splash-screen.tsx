import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface AnimatedSplashScreenProps {
    image: any
    children: React.ReactNode
}

export default function AnimatedSplashScreen({ children, image }: Readonly<AnimatedSplashScreenProps>) {
    const animation = useMemo(() => new Animated.Value(1), [])
    const [isAppReady, setIsAppReady] = useState(false)
    const [isSplashAnimationComplete, setIsSplashAnimationComplete] = useState(false)
  
    useEffect(() => {
      if (isAppReady) {
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => setIsSplashAnimationComplete(true))
      }
    }, [isAppReady])
  
    const onImageLoaded = useCallback(async () => {
      try {
        await SplashScreen.hideAsync()
        // Load stuff
        await Promise.all([])
      } catch (e) {
        // handle errors
      } finally {
        setIsAppReady(true)
      }
    }, [])
  
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
                opacity: animation,
              },
            ]}
          >
            <Animated.Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: Constants.expoConfig?.splash?.resizeMode ?? "contain",
                transform: [
                  {
                    scale: animation,
                  },
                ],
              }}
              source={image}
              onLoadEnd={onImageLoaded}
              fadeDuration={0}
            />
          </Animated.View>
        )}
      </View>
    )
  }