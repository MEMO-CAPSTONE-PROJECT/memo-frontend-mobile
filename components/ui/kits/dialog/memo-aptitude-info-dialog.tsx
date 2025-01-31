import MemoDialog from "@/components/dialog/memo-dialog";
import { Color } from "@/constants/theme/color";
import { RankCriteria } from "@/shared/types/criteria-type";
import { Info } from "phosphor-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface MemoAptitudeInfoDialogProps {
    criteria: RankCriteria[]
}

export default function MemoAptitudeInfoDialog({ criteria }: Readonly<MemoAptitudeInfoDialogProps>) {
    return (
        <MemoDialog
            key="memo-aptitude-info-dialog"
            button={
                <TouchableOpacity>
                    <Info color={Color["system-blue"]} size={24} weight="fill" />
                </TouchableOpacity>
            }
        >
            <Text className="font-kanit-bold text-title text-title-1">เกี่ยวกับความสามารถที่โดดเด่น</Text>
            {criteria.map(({ name, icon, percent }) => (
                <View key={name} className="p-xl flex-row items-center justify-between">
                    <View className="flex-row gap-x-5xl">
                        <View className="w-6 h-6 rounded-sm items-center justify-center">
                            {icon}
                        </View>
                        <Text className="font-kanit-medium text-body w-24 text-start">{name}</Text>
                    </View>
                    <View className="bg-system-lightest-gray rounded-sm px-lg py-sm w-32">
                        <Text className="font-kanit-medium text-title text-center">&gt; {percent}%</Text>
                    </View>
                </View>
            ))}
        </MemoDialog>
    )
}