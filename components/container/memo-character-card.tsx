import StudentBoyDefaultSvg from "@/components/ui/icons/student/boy/default-svg"
import StudentGirlDefaultSvg from "@/components/ui/icons/student/girl/default-svg"
import clsx from "clsx"
import React, { Fragment } from "react"
import { Pressable, PressableProps, Text, View } from "react-native"

interface MemoCharacterCardProps extends PressableProps {
    active?: boolean
    texts?: MemoCharacterCardText[]
    character?: React.ReactNode
    gender?: string
    onPress?: () => void
}


interface MemoCharacterCardText {
    text: string
    extraClassName: string
}

export default function MemoCharacterCard({ active, character, gender, onPress, texts = [], ...props }: Readonly<MemoCharacterCardProps>) {
    const states = {
        default: { container: "bg-[transparent] border-xsm border-system-gray", textContainer: "text-body-1" },
        active: { container: "bg-primary-2 border-xsm border-primary-2", textContainer: "text-system-white" },
    }
    const { container, textContainer } = active ? states.active : states.default

    let mascot: React.ReactNode
    if (character) {
        mascot = character
    } else {
        switch (gender) {
            case "woman":
            case "girl":
            case "หญิง":
                mascot = <StudentGirlDefaultSvg container="medium" size={70} />
                break;
            case "man":
            case "boy":
            case "ชาย":
                mascot = <StudentBoyDefaultSvg container="medium" size={75} />
                break;
            default:
                mascot = <StudentBoyDefaultSvg container="medium" size={75} />
                break;
        }
    }
    return (
        <Pressable onPress={onPress} className={`flex-row items-center h-[110] rounded-sm p-xl gap-x-xl overflow-hidden ${container}`} {...props}>
            {
                active && (
                    <Fragment>
                        <View className={`absolute -bottom-16 right-8 border-title-1 border-[30px] opacity-20 w-[100px] h-[100px] rounded-circle`} />
                        <View className={`absolute -top-12 -right-12 border-title-1 border-[30px] opacity-20 w-[100px] h-[100px] rounded-circle`} />
                    </Fragment>
                )
            }
            {mascot}
            <View className="flex-1 flex-col justify-center">
                {texts.map(({ text, extraClassName }, index) => 
                    <Text key={index} className={clsx(textContainer, extraClassName)}>{text}</Text>
                )}
            </View>
        </Pressable>
    )
}