import BlackboardSvg from "@/components/ui/icons/blackboard-svg";
import TeacherManDefaultSvg from "@/components/ui/icons/teacher/man/default-svg";
import TeacherWomanDefaultSvg from "@/components/ui/icons/teacher/woman/default-svg";
import { View } from "react-native";

interface TeacherBlackboardSvgProps {
    className?: string
}

export default function TeacherBlackboardSvg({ className }: Readonly<TeacherBlackboardSvgProps>) {
    return (
        <View className={className}>
            <View className="relative w-[25rem] h-[13rem]">
                <BlackboardSvg className="absolute top-0 right-14 left-14" size={250}/>
                <TeacherManDefaultSvg className="absolute top-16 right-[15.5rem]" size={125}/>
                <TeacherWomanDefaultSvg className="absolute top-16 left-60" size={120} flip/>
            </View>
        </View>
    )
}