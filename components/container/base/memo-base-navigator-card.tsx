import clsx from "clsx";
import { TouchableOpacity } from "react-native";

interface MemoBaseNavigatorCardProps {
    disabled?: boolean
    disabledStyled?: boolean
    onPress?: () => void
    children: React.ReactNode
    className?: string
}

export default function MemoBaseNavigatorCard({
    disabled,
    disabledStyled = true,
    onPress,
    children,
    className
}: Readonly<MemoBaseNavigatorCardProps>) {
    return (
        <TouchableOpacity
            className={clsx(`flex-row items-center justify-between border-xsm border-system-gray h-fit rounded-sm p-lg ${disabled && disabledStyled ? "opacity-25" : ""}`, className)}
            disabled={disabled}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    )
}