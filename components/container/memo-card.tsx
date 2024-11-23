import clsx from "clsx";
import { View } from "react-native";

interface MemoCardProps {
    variant?: keyof MemoCardVariant
    size?: keyof MemoCardSize
    children: React.ReactNode
    containerClassName?: string
    className?: string
}

interface MemoCardVariant {
    primary: string
}

interface MemoCardSize {
    full: string
    medium: string
}

export default function MemoCard({ variant = "primary", size = "medium", children, className, containerClassName }: Readonly<MemoCardProps>) {
    const sizes = {
        full: { height: "h-full", rounded: "rounded-t-lg", padding: "p-[1.5rem] pt-[2rem]" },
        medium: { height: "h-[45rem]", rounded: "rounded-t-lg", padding: "p-[1.5rem] pt-[2rem]" },
    }
    const variants = {
        primary: { bgColor: "bg-system-white" },
    }
    const { height, rounded, padding } = sizes[size]
    const { bgColor } = variants[variant]

    return (
        <View className={clsx(`w-full ${height}`, containerClassName)}>
            <View className={clsx(`flex-1 ${bgColor} ${padding} ${rounded}`, className)}>
                {children}
            </View>
        </View>
    )
}