import { useMemo } from "react";
import { View } from "react-native";

interface CardContainerProps {
    variant?: "primary"
    size?: "medium" 
    children: React.ReactNode
}

export default function CardContainer({ variant = "primary", size = "medium", children }: CardContainerProps) {
    const { height, rounded } = useMemo(() => {
        const classes = {
            medium: { height: "h-[40rem]", rounded: "rounded-[30px]" },
        }
        return classes[size]
    }, [size])
    const { bgColor } = useMemo(() => {
        const classes = {
            primary: { bgColor: "bg-system-white" },
        }
        return classes[variant]
    }, [variant])

    return (
        <View className={`flex justify-between p-6 m-6 ${bgColor} ${height} ${rounded}`}>
            {children}
        </View>
    )
}