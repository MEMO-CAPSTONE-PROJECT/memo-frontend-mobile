import MedalSvg from "@/components/ui/icons/medal-svg"
import ParentManHappySvg from "@/components/ui/icons/parent/man/happy-svg"
import ParentWomanHappySvg from "@/components/ui/icons/parent/woman/happy-svg"
import CircleSvg from "@/components/ui/icons/shape/circle-svg"
import RectangleSvg from "@/components/ui/icons/shape/rectangle-svg"
import TrophySvg from "@/components/ui/icons/trophy-svg"
import { View } from "react-native"

interface SurpriseParentSvgProps {
    className?: string
}

export default function SurpriseParentSvg({ className }: Readonly<SurpriseParentSvgProps>) {
    return (
        <View className={className}>
            <View className="relative w-[25rem] h-[13rem]">
                <CircleSvg className="absolute top-0 right-24 left-24" size={190} color="system-light-blue"/>
                <View className="absolute top-3 left-[8.5rem] w-[10rem] h-[5rem] ">
                    <RectangleSvg size={20} className="absolute top-0 left-6 rotate-[-35deg]"/>
                    <RectangleSvg size={20} className="absolute top-8 left-2 rotate-[20deg]"/>
                    <RectangleSvg size={20} className="absolute top-4 right-9 rotate-[30deg]"/>
                    <RectangleSvg size={14} className="absolute top-8 right-4 rotate-[20deg]"/>
                    <RectangleSvg size={14} className="absolute bottom-2 right-11 rotate-[-40deg]"/>
                    <RectangleSvg size={14} className="absolute bottom-3 left-9 rotate-[-30deg]"/>
                </View>
                <MedalSvg className="absolute top-6 left-[11.5rem] rotate-[-15deg]" size={45}/>
                <TrophySvg className="absolute top-[5.5rem] left-[9.5rem] rotate-[10deg]" size={90}/>
                <ParentWomanHappySvg className="absolute top-10 left-4 rotate-[-20deg]" size={120}/>
                <ParentManHappySvg className="absolute top-20 right-6 rotate-[30deg]" size={120} flip/>
            </View>
        </View>
    )
}