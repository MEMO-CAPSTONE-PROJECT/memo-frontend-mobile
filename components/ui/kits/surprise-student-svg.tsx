import BookSvg from "@/components/ui/icons/book-svg";
import CircleSvg from "@/components/ui/icons/shape/circle-svg";
import StudentBoyLookingSvg from "@/components/ui/icons/student/boy/look-svg";
import StudentGirlHappySvg from "@/components/ui/icons/student/girl/happy-svg";
import { View } from "react-native";

interface SurpriseStudentSvgProps {
    className?: string
}

export default function SurpriseStudentSvg({ className }: Readonly<SurpriseStudentSvgProps>) {
    return (
        <View className={className}>
            <View className="relative w-[25rem] h-[13rem]">
                <CircleSvg className="absolute top-2 right-28 left-28" size={150} color="primary-1"/>
                <BookSvg className="absolute top-14 right-[9.25rem] rotate-[30deg]" size={45}/>
                <BookSvg className="absolute top-8 left-[9.25rem] rotate-[-20deg]" size={45}/>
                <StudentBoyLookingSvg className="absolute top-8 right-60 rotate-[-20deg]" size={130}/>
                <StudentGirlHappySvg className="absolute top-14 left-60 rotate-[30deg]" size={120} flip/>
            </View>
        </View>
    )
}