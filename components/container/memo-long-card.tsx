import { View } from "react-native"

interface MemoLongCardProps {
    variant?: keyof MemoLongCardVariant
    children: React.ReactNode
}

interface MemoLongCardVariant {
    primary: string
    secondary: string
    ghost: string
}

export default function MemoLongCard({ variant = "ghost", children }: Readonly<MemoLongCardProps>) {
    const variants = {
        primary: { container: "", circle: "opacity-20"},
        secondary: { container: "", circle: "border-body-2 opacity-20"},
        ghost: { container: "bg-system-light-gray", circle: "border-body-2 opacity-20"}
    }
    const { container, circle } = variants[variant]
    return (
        <View className={`w-full h-[110] overflow-hidden items-center justify-center rounded-md ${container}`}>
            <View className={`absolute -bottom-16 right-8  border-[30px] w-[100px] h-[100px] rounded-circle ${circle}`} />
            <View className={`absolute -top-12 -right-12 border-[30px] w-[100px] h-[100px] rounded-circle ${circle}`} />
            {children}
        </View>
    )
}