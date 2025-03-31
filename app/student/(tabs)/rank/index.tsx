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
import { useRankQuery } from "@/hooks/query/useRankQuery";
import { useStudentToken } from "@/hooks/useUserToken";
import { isMan } from "@/shared/utils/gender-util";
import React, { useMemo, useState } from "react";
import { Text, View } from "react-native";

export default function StudentRankScreen() {
    const [isClassLevel, setIsClassLevel] = useState(false)
    const { data: currentStudent } = useStudentToken()
    const { data: rawStudents, refetch: refetchRank} = useRankQuery(isClassLevel ?
        {   
            classLevel: Number(currentStudent?.classLevel ?? "1"), 
        } :
        { 
            classLevel: Number(currentStudent?.classLevel ?? "1"), 
            classRoom: Number(currentStudent?.classRoom ?? "1") 
        }
    )
    
    const students = useMemo(() => rawStudents?.data?.students ?? [], [rawStudents])
    const buttons = [
        { name: "จัดอันดับชั้น", active: isClassLevel, onPress: () => setIsClassLevel(true)},
        { name: "จัดอันดับห้อง", active: !isClassLevel, onPress: () => setIsClassLevel(false)},
    ]

    const currentStudentIndex = useMemo(() => students.findIndex(student => 
        String(student.studentId) === String(currentStudent?.sub)
    ), [students, currentStudent?.sub])
    const sortedStudents = students.sort((a, b) => b.pointsTotal - a.pointsTotal)
    const topThree = sortedStudents.slice(0, 3)
    const classLabel = (index: number) => isClassLevel ? `ชั้น ป.${students[index]?.classLevel}` : `ห้อง ${students[index]?.classRoom}`

    function handleRefresh() {
        refetchRank()
    }
    return (
        <BrandingBackground variant="secondary">
           <MemoCard size="full" className="gap-y-xl !p-0">
                <View className="px-[1.5rem] gap-y-xl">
                    <MemoSwitchButton buttons={buttons}/>
                    <MemoRemarkableCard>
                        <View className="flex-row gap-x-xl items-center">
                            <View className="bg-system-gray h-full aspect-square rounded-sm justify-center items-center">
                                <Text className="text-header text-title-1 font-kanit-bold">{currentStudentIndex + 1}</Text>
                            </View>
                            <View className="flex-col">
                                <Text className="font-kanit-bold text-title-1">{students[currentStudentIndex]?.firstName} {classLabel(currentStudentIndex)}</Text>
                                <Text className="font-kanit-medium text-title-1">{students[currentStudentIndex]?.pointsTotal} คะแนน</Text>
                            </View>
                        </View>
                        <TrophySvg className="justify-center items-center" width={80} height={128}/>
                    </MemoRemarkableCard>
                </View>
                <ScrollableView border={false} className="flex-col px-[1.5rem]" onRefresh={handleRefresh}>
                    <View className="flex-row justify-center items-end gap-x-2xl pb-lg">
                        {topThree[1] && 
                            <TopUser icon={<CrownSvg variant="silver" width={40} height={40}/>} rank={2} name={topThree[1].firstName} score={topThree[1].pointsTotal}>
                                <UserGenderIcon gender={topThree[1].gender} />
                            </TopUser>
                        }
                        {topThree[0] && 
                            <TopUser icon={<CrownSvg variant="gold" width={40} height={40}/>} rank={1} name={topThree[0].firstName} score={topThree[0].pointsTotal}>
                                <UserGenderIcon gender={topThree[0].gender} size="large" />
                            </TopUser>
                        }
                        {topThree[2] &&  
                            <TopUser icon={<CrownSvg variant="bronze" width={40} height={40}/>} rank={3} name={topThree[2].firstName} score={topThree[2].pointsTotal}>
                                <UserGenderIcon gender={topThree[2].gender} />
                            </TopUser>
                        }
                    </View>
                    <MemoSeperator/>     
                    <View>
                        {sortedStudents.slice(3, sortedStudents.length).map((student, index) => (
                            <User key={index} index={index + 4} name={student.firstName} score={student.pointsTotal} active={currentStudentIndex === (index + 3)}>
                                <UserGenderIcon gender={student.gender} size="small" />
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