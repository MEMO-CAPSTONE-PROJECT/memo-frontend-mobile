import { useMemo } from "react";
import { View } from "react-native";

interface BrandingBackgroundProps {
    color: "primary" | "secondary" | "error" | "success"
    children: React.ReactNode
    className?: string
}

export default function BrandingBackground({ color, children, className }: BrandingBackgroundProps) {
    const { background, border } = useMemo(() => {
        const classes = {
            primary: { background: "bg-primary-2", border: "border-primary-3" },
            secondary: { background: "bg-secondary-1", border: "border-secondary-2" },
            error: { background: "bg-system-error", border: "border-primary-3" },
            success: { background: "bg-system-success", border: "border-primary-2" }
        }
        return classes[color]
    }, [color])
    return (
        <View className={`w-full h-full ${background} ${className}`}>
            <View className={`absolute -top-32 -left-[22rem] z-10 ${border} border-[125px] opacity-20 w-[488px] h-[488px] rounded-[488px]`}/>
            <View className={`absolute -top-[15rem] -right-[15rem] z-10 ${border} border-[100px] opacity-20 w-[388px] h-[388px] rounded-[388px]`}/>
            <View className={`absolute top-64 -right-48 z-10 ${border} border-[75px] opacity-20 w-[288px] h-[288px] rounded-[288px]`}/>
            {children}
        </View>
    )
}