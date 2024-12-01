import AnimatedAppLoader from '@/components/animated/animated-app-loader'
import { AuthProvider } from '@/context/useAuth'
import tamaguiConfig from '@/tamagui.config'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { TamaguiProvider } from "@tamagui/core"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Text } from 'react-native'
import 'react-native-reanimated'
import { PortalProvider } from 'tamagui'
import './global.css'

const queryClient = new QueryClient()
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
    <PortalProvider shouldAddRootHost>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AnimatedAppLoader>
              <TamaguiProvider config={tamaguiConfig}>
                <ThemeProvider value={DefaultTheme}>
                  <Stack screenOptions={{ headerShown: false, }}>
                    <Stack.Screen name="(index)" />
                    <Stack.Screen name="+not-found" />
                  </Stack>
                </ThemeProvider>
              </TamaguiProvider>
            </AnimatedAppLoader>
          </AuthProvider>
        </QueryClientProvider>
    </PortalProvider>
  )
}
