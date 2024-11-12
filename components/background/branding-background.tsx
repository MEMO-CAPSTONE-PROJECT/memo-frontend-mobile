import { SafeAreaView, View } from "react-native";

interface BrandingBackgroundProps {
    variant: keyof BrandingBackgroundVariant
    children: React.ReactNode
    className?: string
}

interface BrandingBackgroundVariant {
    primary: string
    secondary: string
    error: string
    success: string
}

export default function BrandingBackground({ variant, children, className }: Readonly<BrandingBackgroundProps>) {
    const variants = {
        primary: { background: "bg-primary-2", border: "border-primary-3" },
        secondary: { background: "bg-secondary-1", border: "border-secondary-2" },
        error: { background: "bg-system-error", border: "border-primary-3" },
        success: { background: "bg-system-success", border: "border-primary-2" }
    }
    const { background, border } = variants[variant]
    return (
        <View className={`w-full h-full ${background}`}>
            <View className={`absolute -top-32 -left-[22rem] z-10 ${border} border-[125px] opacity-20 w-[488px] h-[488px] rounded-[488px]`}/>
            <View className={`absolute -top-[15rem] -right-[15rem] z-10 ${border} border-[100px] opacity-20 w-[388px] h-[388px] rounded-[388px]`}/>
            <View className={`absolute top-64 -right-48 z-10 ${border} border-[75px] opacity-20 w-[288px] h-[288px] rounded-[288px]`}/>
            <SafeAreaView className={`z-20 w-full h-full ${className}`}>
                {children}
            </SafeAreaView>
        </View>
    )
}