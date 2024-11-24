import AnimatedAppLoader from '@/components/animated/animated-app-loader'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import './global.css'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    "Kanit-Regular": require('../assets/fonts/Kanit-Regular.ttf'),
    "Kanit-Medium": require('../assets/fonts/Kanit-Medium.ttf'),
    "Kanit-Light": require('../assets/fonts/Kanit-Light.ttf'),
    "Kanit-Bold": require('../assets/fonts/Kanit-Bold.ttf'),
    "Kanit-ExtraBold": require('../assets/fonts/Kanit-ExtraBold.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) return null

  return (
    <AnimatedAppLoader>
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false, }}>
          <Stack.Screen name="(index)" />
          <Stack.Screen name="+not-found"/>
        </Stack>
      </ThemeProvider>
    </AnimatedAppLoader>
  )
}
