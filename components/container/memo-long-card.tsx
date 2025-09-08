import { View } from "react-native"

interface MemoLongCardProps {
    variant?: keyof MemoLongCardVariant
    height? : number
    circleSize?: number
    className?: string
    children: React.ReactNode
}

interface MemoLongCardVariant {
    primary: string
    secondary: string
    ghost: string
}

export default function MemoLongCard({ variant = "ghost", children, className, height = 110, circleSize = 100  }: Readonly<MemoLongCardProps>) {
    const variants = {
        primary: { container: "", circle: "opacity-20"},
        secondary: { container: "", circle: "border-body-2 opacity-20"},
        ghost: { container: "bg-system-light-gray", circle: "border-body-2 opacity-20"}
    }
    const { container, circle } = variants[variant]
    return (
        <View className={`w-full overflow-hidden items-center justify-center rounded-md ${container} ${className}`} style={{ height: height }}>
            <View className={`absolute -bottom-16 right-8  border-[30px] rounded-circle ${circle}`} style={{ width: circleSize, height: circleSize }} />
            <View className={`absolute -top-12 -right-12 border-[30px]  rounded-circle ${circle}`} style={{ width: circleSize, height: circleSize }} />
            {children}
        </View>
    )
}