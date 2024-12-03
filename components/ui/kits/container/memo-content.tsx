import MemoContentIconBox from "@/components/container/box/memo-content-icon-box"
import MemoPill from "@/components/pill/memo-pill"
import { Href, router } from "expo-router"
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native"

export interface MemoContent {
    id: string
    name: string
    src?: ImageSourcePropType,
    sections: {
        reward: string
        date: string
        organizer: string
    }
    tags: MemoContentTag[]
}

export interface MemoContentOwner {
    id: string
    name: string
    owner: string
    src?: ImageSourcePropType
    sections: {
        reward: string
        date: string
        organizer: string
    }
    tags: MemoContentTag[]
}

export interface MemoContentTag {
    id: string,
    borderColor?: string
    backgroundColor?: string
    textColor?: string
}

export interface MemoSection {
    id: keyof MemoContent["sections"]
    name: string
    icon: React.FC
    secondary: boolean
}

interface MemoContentCardProps {
    divider: boolean
    content: MemoContent | MemoContentOwner
    sections: MemoSection[]
    href: Href
    isOwner?: boolean
}

export default function MemoContentCard({
    divider,
    content,
    sections,
    href,
    isOwner = false,
}: Readonly<MemoContentCardProps>) {
    const border = divider ? "border-b-sm border-system-light-gray" : ""
    function navigate() {
        router.push(href)
    }
    return (
        <View className={`gap-y-lg px-[1.5rem] pb-xl ${border}`}>
            <View className="gap-y-sm">
                {content.src && <Image alt={content.name} source={content.src} className="w-full h-[180] object-fill rounded-sm" />}
                <Text className="font-kanit-bold text-title">{content.name}</Text>
                <View className="flex-row gap-x-md">
                    {content.tags.map((tag, index) => (
                        <MemoPill
                            key={`${index}_${tag.id}`} 
                            name={tag.id} 
                            backgroundColor={tag.backgroundColor}
                            borderColor={tag.borderColor}
                            textColor={tag.textColor}
                        />
                    ))}
                </View>
            </View>
            {sections.map(({ id, name, icon, secondary }) => (
                <MemoContentIconBox 
                    key={id} 
                    title={name} 
                    detail={content.sections[id]} 
                    icon={icon} 
                    variant={secondary ? "secondary" : "primary"} 
                />
            ))}
            <TouchableOpacity onPress={navigate} className="flex-row justify-between">
                <Text className="font-kanit-regular text-system-blue">รายละเอียดเพิ่มเติม &raquo;</Text>
            </TouchableOpacity>
        </View>
    )
}