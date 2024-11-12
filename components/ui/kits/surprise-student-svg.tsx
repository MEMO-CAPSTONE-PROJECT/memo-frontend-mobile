import BookSvg from "@/components/ui/icons/book/book-svg";
import CircleSvg from "@/components/ui/icons/circle/circle-svg";
import MascotBoyLookingSvg from "@/components/ui/icons/mascot/boy/look-svg";
import MascotGirlHappySvg from "@/components/ui/icons/mascot/girl/happy-svg";
import { View } from "react-native";

interface SurpriseStudentSvgProps {
    className?: string
}

export default function SurpriseStudentSvg({ className }: Readonly<SurpriseStudentSvgProps>) {
    return (
        <View className={className}>
            <View className="relative w-[20rem] h-[12rem]">
                <CircleSvg className="absolute bottom-6 right-20 left-20" size={145} color="primary-1"/>
                <BookSvg className="absolute top-14 right-[6.5rem] rotate-[30deg]" size={45}/>
                <BookSvg className="absolute top-8 left-[7rem] rotate-[-20deg]" size={45}/>
                <MascotBoyLookingSvg className="absolute top-8 right-48 rotate-[-20deg]" size={130}/>
                <MascotGirlHappySvg className="absolute top-16 left-48 rotate-[30deg]" size={120} flip/>
            </View>
        </View>
    )
}