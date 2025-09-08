import { View } from "react-native";

interface MemoSeperatorProps {
    className?: string
}   

export default function MemoSeperator({ className }: Readonly<MemoSeperatorProps>) {
    return (
        <View className={`h-0.5 bg-system-light-gray ${className}`}/>
    )
}