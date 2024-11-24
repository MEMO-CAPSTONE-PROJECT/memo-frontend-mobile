import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Text } from 'react-native'
import 'react-native-reanimated'
import './global.css'
import AnimatedAppLoader from '@/components/animated/animated-app-loader'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Kanit-Regular": require('@/assets/fonts/Kanit-Regular.ttf'),
    "Kanit-Medium": require('@/assets/fonts/Kanit-Medium.ttf'),
    "Kanit-Light": require('@/assets/fonts/Kanit-Light.ttf'),
    "Kanit-Bold": require('@/assets/fonts/Kanit-Bold.ttf'),
    "Kanit-ExtraBold": require('@/assets/fonts/Kanit-ExtraBold.ttf'),
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) return <Text>400 | Error Page</Text>

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
