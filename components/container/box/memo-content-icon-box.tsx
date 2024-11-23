import MemoIconBox, { MemoIconBoxVariant } from "@/components/container/box/memo-icon-box";
import { Icon } from "phosphor-react-native";
import { Text, View } from "react-native";

interface MemoContentIconBoxProps {
    title: string
    detail: string
    icon: Icon
    variant: keyof MemoIconBoxVariant
}

export default function MemoContentIconBox({ title, detail, icon, variant }: Readonly<MemoContentIconBoxProps>) {
    return (
        <View className="flex-row gap-x-lg items-center">
            <MemoIconBox icon={icon} variant={variant} />
            <View>
                <Text className="font-kanit-regular text-title-1 text-body">{title}</Text>
                <Text className="font-kanit-regular text-body-1 text-caption-2">{detail}</Text>
            </View>
        </View>
    )
}