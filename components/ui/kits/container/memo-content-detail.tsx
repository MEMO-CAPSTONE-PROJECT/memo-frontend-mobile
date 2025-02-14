import MemoImageCarousel from "@/components/carousel/memo-image-carousel"
import MemoContentIconBox from "@/components/container/box/memo-content-icon-box"
import MemoPill from "@/components/pill/memo-pill"
import MemoSeperator from "@/components/seperator/memo-seperator"
import { AchievementById } from "@/shared/types/achievement-type"
import { formattedPeople, formattedReward, getAptitudeColor } from "@/shared/utils/aptitude-util"
import { formattedDate } from "@/shared/utils/date-util"
import { CalendarDots, GraduationCap, Medal, Users } from "phosphor-react-native"
import { Fragment } from "react"
import { Text, View } from "react-native"

interface MemoContentDetailProps<T extends AchievementById> {
    achievement?: T
    children?: React.ReactNode
}

export default function MemoContentDetail<T extends AchievementById>({ achievement, children }: Readonly<MemoContentDetailProps<T>>) {

    const date = formattedDate(achievement?.sections?.startDate, achievement?.sections?.endDate)
    const amount = formattedPeople(achievement?.people?.current, achievement?.people?.max)
    const reward = formattedReward(achievement?.points)
    const organizer = achievement?.sections?.organizer
    const description = achievement?.description

    return (
        <Fragment>
            {achievement?.images && <MemoImageCarousel 
                images={achievement?.images.map((image) => ({ uri: image.fileEndPoint }))} 
                height={300}
            />}
            <View className="p-[1.5rem] flex-row justify-between">
                <View className="flex-1 flex-col gap-y-sm">
                    <Text className="font-kanit-bold text-title text-title-1">{achievement?.name}</Text>
                    <View className="flex-row flex-wrap gap-md">
                        {achievement?.points?.map((point, index) => {
                            const achievement = point.details?.[0]
                            const color = getAptitudeColor(achievement?.color)
                            return (
                                <MemoPill
                                    key={index + "_" + achievement?.type}
                                    name={achievement?.type}
                                    borderColor={color?.color}
                                    backgroundColor={color?.light}
                                    textColor={color?.color}
                                />
                            )
                        })}
                    </View>
                </View>
            </View>
            <MemoSeperator />
            <View className="flex p-[1.5rem] gap-y-lg">
                <MemoContentIconBox
                    title={"รางวัล"}
                    detail={reward}
                    icon={Medal}
                    variant={"secondary"}
                />
                <MemoContentIconBox
                    title={"วันที่ปิดรับ"}
                    detail={date}
                    icon={CalendarDots}
                    variant={"primary"}
                />
                <MemoContentIconBox
                    title={"คุณครูผู้ดูแล"}
                    detail={organizer}
                    icon={GraduationCap}
                    variant={"primary"}
                />
                <MemoContentIconBox
                    title={"จำนวนผู้สมัคร"}
                    detail={amount}
                    icon={Users}
                    variant={"primary"}
                />
                <View className="gap-y-sm">
                    <Text className="font-kanit-bold text-title text-title-1">รายละเอียด</Text>
                    <Text className="font-kanit-regular text-body text-body-1">{description}</Text>
                </View>
            </View>
            {children && <MemoSeperator />}
            {children}
        </Fragment>
    )
}