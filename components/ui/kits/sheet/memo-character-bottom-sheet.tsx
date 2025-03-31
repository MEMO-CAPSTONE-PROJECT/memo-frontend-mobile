import ScrollableView from "@/components/scrollable/scrollable-view";
import MemoBottomSheet from "@/components/sheet/memo-bottom-sheet";
import StudentCharacter from "@/components/ui/kits/student-character";
import { AptitudeType } from "@/constants/aptitude-type";
import { Color } from "@/constants/theme/color";
import { getAptitudeColor } from "@/shared/utils/aptitude-util";
import { Info } from "phosphor-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SelectSeparator } from "tamagui";

interface MemoAptitudeBottomSheetProps {
    gender: string
}

export default function MemoStudentCharacterBottomSheet({ gender }: Readonly<MemoAptitudeBottomSheetProps>) {
    return (
        <MemoBottomSheet
            id="memo-aptitude-student-character"
            button={
                <TouchableOpacity>
                    <Info color={Color["system-blue"]} size={24} weight="fill" />
                </TouchableOpacity>
            }
            snapPoints={[75]}
            snapPointsMode="percent"
            // snapPointsMode="fit"
        >
            <Text className="font-kanit-bold text-title text-title-1">เกี่ยวกับบุคลิกทั้ง 6 ด้าน</Text>
            <SelectSeparator />
            <ScrollableView className="flex-col" border={false}>
                {Object.keys(AptitudeType).map((aptitude) => {
                    const color = getAptitudeColor(AptitudeType[aptitude]);
                    return (
                        <View key={aptitude} className="flex-col justify-center items-center">
                            <View className="w-[200] h-[200] scale-[0.75]">
                                <StudentCharacter
                                    gender={gender}
                                    aptitude={aptitude}
                                    aptitudeColor={color?.color ?? Color["primary-2"]}
                                    aptitudeColor2={color?.light ?? Color["system-light-purple"]}
                                />
                            </View>
                            <Text className="font-kanit-bold text-body">{aptitude}</Text>
                        </View>
                )})}
            </ScrollableView>
        </MemoBottomSheet>
    )
}