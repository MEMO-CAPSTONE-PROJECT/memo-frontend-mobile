import MemoContentIconBox from "@/components/container/box/memo-content-icon-box"
import MemoPill from "@/components/pill/memo-pill"
import { Href, Link } from "expo-router"
import { Image, ImageSourcePropType, Text, View } from "react-native"

export interface MemoContent {
    id: string
    name: string
    open: boolean
    src?: ImageSourcePropType,
    sections: {
        reward: string
        date: string
        organizer: string
    }
    tags: MemoContentTag[]
}

export interface MemoContentTag {
    id: string,
    variant: "primary" | "secondary"
}

export interface MemoSection {
    id: keyof MemoContent["sections"]
    name: string
    icon: React.FC
    secondary: boolean
}

interface MemoContentCardProps {
    divider: boolean
    content: MemoContent
    sections: MemoSection[]
    href: Href
}

export default function MemoContentCard({
    divider,
    content,
    sections,
    href,
}: Readonly<MemoContentCardProps>) {
    const border = divider ? "border-b-sm border-system-light-gray" : ""
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
                            variant={tag.variant} 
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
            <Link href={href} asChild>
                <Text className="font-kanit-regular text-system-blue">รายละเอียดเพิ่มเติม &raquo;</Text>
            </Link>
        </View>
    )
}