import AnimatedSplashScreen from "@/components/animated/animated-splash-screen";
import { Asset } from "expo-asset";
import { useEffect, useState } from "react";

interface AnimatedAppLoaderProps {
    children: React.ReactNode
}

const SPLASH_IMAGE_URI = "@/assets/images/splash.png"
const SPLASH_IMAGE = require(SPLASH_IMAGE_URI)

export default function AnimatedAppLoader({ children }: Readonly<AnimatedAppLoaderProps>) {
    const [isSplashReady, setIsSplashReady] = useState(false)
    useEffect(() => {
      async function prepare() {
        await Asset.fromModule(SPLASH_IMAGE).downloadAsync().catch(console.error)
        setIsSplashReady(true)
      }
  
      prepare()
    }, [])
  
    if (!isSplashReady) {
      return null
    }
  
    return <AnimatedSplashScreen image={SPLASH_IMAGE}>{children}</AnimatedSplashScreen>
}