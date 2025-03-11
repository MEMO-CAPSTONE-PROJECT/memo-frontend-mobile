import { View } from "react-native"

interface MemoRemarkableCardProps {
    variant?: keyof MemoRemarkableCardVariant
    size?: keyof MemoRemarkableCardSize
    children?: React.ReactNode
}

interface MemoRemarkableCardVariant {
    primary: string
    secondary: string
    gray: string
}

interface MemoRemarkableCardSize {
    large: string
}

export default function MemoRemarkableCard({ size = "large", variant = "gray", children }: Readonly<MemoRemarkableCardProps>) {
    const variants = {
        primary: { card: "bg-primary-1", border: "border-system-gray" },
        secondary: { card: "bg-secondary-2", border: "border-system-gray" },
        gray: { card: "bg-system-light-gray", border: "border-body-2" },
    }
    const sizes = {
        large: { 
            cardContainer: "w-full h-[100] rounded-md", 
            cardPadding: "p-lg", 
            border: "border-[30px] w-[100px] h-[100px]", 
            first: "-top-12 -right-12", 
            second: " -bottom-16 right-10" 
        },
    }
    const { card: cardVariant, border: borderVariant } = variants[variant]
    const { cardContainer, cardPadding, border: borderSize, first, second } = sizes[size]

    return (
        <View className={`${cardVariant} ${cardContainer}`}>
            <View className="absolute w-full h-full overflow-hidden z-0">
                <View className={`absolute ${first} ${borderVariant} ${borderSize} opacity-20 rounded-circle`} />
                <View className={`absolute ${second} ${borderVariant} ${borderSize} opacity-20 rounded-circle`} />
            </View>
            <View className={`flex-row justify-between w-full h-full ${cardPadding} z-10`}>
                {children}
            </View>
        </View>
    )
}