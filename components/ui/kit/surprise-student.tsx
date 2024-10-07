import Book from "@/components/icon/book/book";
import CircleIcon from "@/components/icon/circle/circle-icon";
import MascotBoyLooking from "@/components/icon/mascot/boy/look";
import MascotGirlHappy from "@/components/icon/mascot/girl/happy";
import { View } from "react-native";

interface SurpriseStudentProps {
    className?: string
}

export default function SurpriseStudent({ className }: Readonly<SurpriseStudentProps>) {
    return (
        <View className={className}>
            <View className="relative w-[20rem] h-[12rem]">
                <CircleIcon className="absolute bottom-6 right-20 left-20" size={140} color="primary-1"/>
                <Book className="absolute top-14 right-28 rotate-[30deg]" size={40}/>
                <Book className="absolute top-8 left-28 rotate-[-20deg]" size={40}/>
                <MascotBoyLooking className="absolute top-8 right-48 rotate-[-20deg]" size={110}/>
                <MascotGirlHappy className="absolute top-16 left-48 rotate-[30deg]" size={100} flip/>
            </View>
        </View>
    )
}