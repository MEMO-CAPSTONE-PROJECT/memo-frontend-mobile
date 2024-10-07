import { useMemo } from "react";
import { View } from "react-native";

interface CardContainerProps {
    variant?: "primary"
    size?: "medium" 
    children: React.ReactNode
}

export default function CardContainer({ variant = "primary", size = "medium", children }: Readonly<CardContainerProps>) {
    const { height, rounded, padding, margin, bgColor } = useMemo(() => {
        const sizes = {
            medium: { height: "40rem", rounded: "rounded-lg", padding: "1.5rem", margin: "1.5rem" },
        }
        const variants = {
            primary: { bgColor: "bg-system-white" },
        };
        return {
            ...sizes[size],
            ...variants[variant],
        }
    }, [variant, size])

    return (
        <View className={`flex justify-between h-[${height}] p-[${padding}] m-[${margin}] ${bgColor} ${rounded}`}>
            {children}
        </View>
    )
}