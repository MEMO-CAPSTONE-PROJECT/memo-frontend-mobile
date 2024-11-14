import { Fragment } from "react";
import { Platform, SafeAreaView, View, } from "react-native";

interface BrandingBackgroundProps {
    variant?: keyof BrandingBackgroundVariant
    children: React.ReactNode
    className?: string
    appbar?: boolean
}

interface BrandingBackgroundVariant {
    primary: string
    secondary: string
    error: string
    success: string
}

export default function BrandingBackground({ variant = "secondary", children, className, appbar = false }: Readonly<BrandingBackgroundProps>) {
    const variants = {
        primary: { background: "bg-primary-2", border: "border-primary-3" },
        secondary: { background: "bg-secondary-1", border: "border-secondary-2" },
        error: { background: "bg-system-error", border: "border-primary-3" },
        success: { background: "bg-system-success", border: "border-primary-2" }
    }
    const { background, border } = variants[variant]
    const flex = Platform.OS === "android" ? "flex-[0.03]" : "flex-[0]"

    return (
        <Fragment>
            <SafeAreaView className={`${flex} ${background}`}/>
            <View className={`flex-[1] ${background} ${appbar ? "pt-11" : ""} ${className}`}>
                <View className={`absolute -top-32 -left-[22rem] ${border} border-[125px] opacity-20 w-[488px] h-[488px] rounded-[488px]`}/>
                <View className={`absolute -top-[15rem] -right-[15rem] ${border} border-[100px] opacity-20 w-[388px] h-[388px] rounded-[388px]`}/>
                <View className={`absolute top-64 -right-48 ${border} border-[75px] opacity-20 w-[288px] h-[288px] rounded-[288px]`}/>
                {children}
            </View>
            <SafeAreaView className={`${flex} bg-system-white`}/>
        </Fragment>
    )
}