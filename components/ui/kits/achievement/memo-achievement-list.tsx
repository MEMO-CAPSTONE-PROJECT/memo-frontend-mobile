import ScrollableView from "@/components/scrollable/scrollable-view";
import MemoContentCard, { MemoSection } from "@/components/ui/kits/container/memo-content";
import { Achievement } from "@/shared/types/achievement-type";
import { formattedPointColor, formattedReward } from "@/shared/utils/aptitude-util";
import { formattedDate } from "@/shared/utils/date-util";
import { Href } from "expo-router";

interface MemoAchievementListProps<T extends Achievement> {
    sections: MemoSection[]
    achievements: T[]
    onRefresh: () => void
    href: (id: string, name: string) => Href
    secondaryView?: (achievement: T) => React.ReactNode
}

export default function MemoAchievementList<T extends Achievement>({ sections, achievements, onRefresh, href, secondaryView }: Readonly<MemoAchievementListProps<T>>) {
    return (
        <ScrollableView border={false} gap={false} className="w-screen gap-y-xl" onRefresh={onRefresh}>
            {achievements.map((content, index, contents) => (
                <MemoContentCard
                    divider={index !== contents.length - 1}
                    key={`${index}_${content.name}`}
                    content={{
                        id: content.id,
                        name: content.name,
                        // src: content.src,
                        sections: {
                            reward: formattedReward(content.points),
                            date: formattedDate(content.sections.startDate, content.sections.endDate),
                            organizer: content.sections.organizer
                        },
                        tags: formattedPointColor(content?.points)
                    }}
                    sections={sections}
                    href={href(content.id, content.name)}
                    secondaryView={secondaryView?.(content)}
                />
            ))}
        </ScrollableView>
    )
}