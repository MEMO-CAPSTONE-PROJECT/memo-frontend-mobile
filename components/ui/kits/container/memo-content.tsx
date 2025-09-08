import MemoImageCarousel from "@/components/carousel/memo-image-carousel"
import MemoContentIconBox from "@/components/container/box/memo-content-icon-box"
import MemoPill from "@/components/pill/memo-pill"
import MemoSeperator from "@/components/seperator/memo-seperator"
import { Href, router } from "expo-router"
import { ImageURISource, Text, TouchableOpacity, View } from "react-native"

export interface MemoContent {
    id: string
    name: string
    uris?: ImageURISource[],
    sections: {
        reward: string
        date: string
        organizer: string
    }
    tags: MemoContentTag[]
}

export interface MemoContentOwner extends MemoContent {
    owner: string
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
    secondaryView?: React.ReactNode
}

export default function MemoContentCard({
    divider,
    content,
    sections,
    href,
    secondaryView,
}: Readonly<MemoContentCardProps>) {
    function navigate() {
        router.push(href)
    }
    const isLast = divider ? "" : "pb-[1rem]"
    return (
        <View className={`gap-y-lg`}>
            {content.uris && <MemoImageCarousel images={content.uris}/>}
            <View className="gap-y-sm px-[1.5rem]">
                <Text className="font-kanit-bold text-title w-full">{content.name}</Text>
                <View className="flex-row gap-x-md w-full">
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
                    className="px-[1.5rem]"
                />
            ))}
            <View className={`flex-row justify-between items-end px-[1.5rem] ${isLast}`}>
                <TouchableOpacity onPress={navigate}>
                    <Text className="font-kanit-regular text-system-blue">รายละเอียดเพิ่มเติม &raquo;</Text>
                </TouchableOpacity>
                {secondaryView}
            </View>
            {divider && <MemoSeperator/>}
        </View>
    )
}