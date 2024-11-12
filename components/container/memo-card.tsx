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
    medium: string
}

export default function MemoCard({ variant = "primary", size = "medium", children, className, containerClassName }: Readonly<MemoCardProps>) {
    const sizes = {
        medium: { height: "h-[45rem]", rounded: "rounded-lg", padding: "p-[1.75rem]", container: "px-[1.5rem]" },
    }
    const variants = {
        primary: { bgColor: "bg-system-white" },
    }
    const { height, rounded, padding, container } = sizes[size]
    const { bgColor } = variants[variant]

    return (
        <View className={clsx(`w-full ${height} ${container} ${containerClassName}`)}>
            <View className={`flex-1 ${bgColor} ${padding} ${rounded} ${className}`}>
                {children}
            </View>
        </View>
    )
}