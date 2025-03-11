import BrandingBackground from "@/components/background/branding-background";
import MemoSwitchButton from "@/components/button/memo-switch-button";
import MemoUserBox from "@/components/container/box/memo-user-box";
import MemoCard from "@/components/container/memo-card";
import MemoRemarkableCard from "@/components/container/memo-remarkable-card";
import ScrollableView from "@/components/scrollable/scrollable-view";
import MemoSeperator from "@/components/seperator/memo-seperator";
import CrownSvg from "@/components/ui/icons/crown-svg";
import StudentBoyDefaultSvg from "@/components/ui/icons/student/boy/default-svg";
import StudentGirlDefaultSvg from "@/components/ui/icons/student/girl/default-svg";
import TrophySvg from "@/components/ui/icons/trophy-svg";
import { isMan } from "@/shared/utils/gender-util";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function StudentRankScreen() {
    const [isClass, setIsClass] = useState(false)
    const buttons = [
        { name: "จัดอันดับบุคคล", active: !isClass, onPress: () => setIsClass(false)},
        { name: "จัดอันดับห้อง", active: isClass, onPress: () => setIsClass(true)},
    ]

    return (
        <BrandingBackground variant="secondary">
           <MemoCard size="full" className="gap-y-xl !p-0">
                <View className="px-[1.5rem] gap-y-xl">
                    <MemoSwitchButton buttons={buttons}/>
                    <MemoRemarkableCard>
                        <View className="flex-row gap-x-xl items-center">
                            <View className="bg-system-gray h-full aspect-square rounded-sm justify-center items-center">
                                <Text className="text-header text-title-1 font-kanit-bold">7</Text>
                            </View>
                            <View className="flex-col">
                                <Text className="font-kanit-bold text-title-1">RewLegendary</Text>
                                <Text className="font-kanit-medium text-title-1">12141 คะแนน</Text>
                            </View>
                        </View>
                        <TrophySvg className="justify-center items-center" width={80} height={128}/>
                    </MemoRemarkableCard>
                </View>
                <ScrollableView border={false} className="flex-col px-[1.5rem]">
                    <View className="flex-row justify-center items-end gap-x-2xl pb-lg">
                        <TopUser icon={<CrownSvg variant="silver" width={40} height={40}/>} rank={2} name="Spider" score={99999}>
                            <UserGenderIcon gender="ชาย" />
                        </TopUser>
                        <TopUser icon={<CrownSvg variant="gold" width={40} height={40}/>} rank={1} name="Kate" score={99999}>
                            <UserGenderIcon gender="หญิง" size="large" />
                        </TopUser>
                        <TopUser icon={<CrownSvg variant="bronze" width={40} height={40}/>} rank={3} name="Master" score={99999}>
                            <UserGenderIcon gender="ชาย" />
                        </TopUser>
                    </View>
                    <MemoSeperator/>     
                    <View>
                        {[...Array(10)].map((_, index) => (
                            <User key={index} index={index + 4} name="Spider" score={99999} active={index === 3}>
                                <UserGenderIcon gender={index % 2 === 0 ? "ชาย" : "หญิง"} size="small" />
                            </User>
                        ))}
                    </View>
                </ScrollableView>
            </MemoCard>
        </BrandingBackground>
    )
}

function UserGenderIcon({ size = "medium", gender }: { size?: "small" | "medium" | "large", gender: string }) {
    const getSize = () => {
        switch (size) {
            case "small":
                return 30
            case "medium":
                return 40
            case "large":
                return 60
            default:
                return 24
        }
    }
    const icon = getSize()
    return (
        <MemoUserBox size={size}>
            {isMan(gender) ? <StudentBoyDefaultSvg size={icon}/> : <StudentGirlDefaultSvg size={icon}/>}
        </MemoUserBox>
    )
}

function TopUser({ icon, rank, name, score, children }: { icon: React.ReactNode, rank: number, name: string, score: number, children?: React.ReactNode }) {
    return (
        <View className="flex-col items-center gap-y-xsm">
            {icon}
            <Text className="font-kanit-bold text-primary-2 text-caption-1">อันดับที่ {rank}</Text>
            {children}
            <Text className="font-kanit-medium text-title-1 text-caption-1">{name}</Text>
            <Text className="font-kanit-medium text-secondary-2 text-caption-1">{score} คะแนน</Text>
        </View>
    )
}

function User({ index, name, score, active, children }: { index: number, name: string, score: number, active: boolean, children?: React.ReactNode }) {
    return (
        <View className={`${active ? "bg-system-light-gray" : ""} flex-row justify-between items-center px-lg py-md rounded-sm`}>
            <View className="flex-row gap-x-xl items-center">
                <Text className="w-8 font-kanit-regular text-body-1 text-title text-center">{index}</Text>
                {children}
                <Text className="font-kanit-medium text-body-1 text-caption-1">{name}</Text>
            </View>
            <Text className="font-kanit-bold text-title-1 text-body">{score} คะแนน</Text>
        </View>   
    )
}