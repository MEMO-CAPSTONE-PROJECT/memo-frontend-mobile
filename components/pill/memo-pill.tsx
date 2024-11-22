import { Text, View } from "react-native";

interface MemoPillProps {
    name: string  
    variant?: keyof MemoPillVariant
}

interface MemoPillVariant {
    primary: string
    secondary: string
}

export default function MemoPill({ name, variant = "primary" }: Readonly<MemoPillProps>) {
    const variants = {
        primary: { container: "border-2xsm rounded-xsm border-primary-2 bg-system-light-purple", text: "font-kanit-medium text-primary-2" },
        secondary: { container: "border-2xsm rounded-xsm border-secondary-2 bg-system-light-orange", text: "font-kanit-medium text-secondary-2" },
    }
    const { container, text } = variants[variant]
    return (
        <View className={`${container} w-fit justify-center items-center`}>
            <Text className={`px-md ${text}`}>{name}</Text>
        </View>
    )
}