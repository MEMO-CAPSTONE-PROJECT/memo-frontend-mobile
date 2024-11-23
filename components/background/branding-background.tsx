import { Platform, SafeAreaView, View } from "react-native";

interface BrandingBackgroundProps {
    variant?: keyof BrandingBackgroundVariant
    children: React.ReactNode
    className?: string
}

interface BrandingBackgroundVariant {
    primary: string
    secondary: string
    error: string
    success: string
}

export default function BrandingBackground({ variant = "secondary", children, className }: Readonly<BrandingBackgroundProps>) {
    const variants = {
        primary: { background: "bg-primary-2", border: "border-primary-3" },
        secondary: { background: "bg-secondary-1", border: "border-secondary-2" },
        error: { background: "bg-system-error", border: "border-primary-3" },
        success: { background: "bg-system-success", border: "border-primary-2" }
    }
    const { background, border } = variants[variant]
    const flex = Platform.OS === "android" ? "flex-[0.03]" : "flex-[0]"

    return (
        <View className={`flex-[1] overflow-hidden ${background}`}>
            <SafeAreaView className={`${flex} ${background}`} />
            <View className={`flex-[1] relative ${background} ${className}`} >
                <View className={`absolute -top-56 -left-[23rem] ${border} border-[125px] opacity-20 w-[488px] h-[488px] rounded-circle`} />
                <View className={`absolute -top-[22rem] -right-[16rem] ${border} border-[100px] opacity-20 w-[388px] h-[388px] rounded-circle`} />
                <View className={`absolute top-36 -right-48 ${border} border-[75px] opacity-20 w-[288px] h-[288px] rounded-circle`} />
                {children}
            </View>
            <SafeAreaView className={`${flex} bg-system-white`} />
        </View>
    )
}