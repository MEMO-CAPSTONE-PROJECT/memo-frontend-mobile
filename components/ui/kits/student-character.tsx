import { MemoCase, MemoSwitch } from "@/components/logic/memo-switch";
import BodySvg from "@/components/ui/icons/body-svg";
import CrownSvg from "@/components/ui/icons/crown-svg";
import HeadbandSvg from "@/components/ui/icons/decorations/competition/headband-svg";
import MedallaceSvg from "@/components/ui/icons/decorations/competition/medallace-svg";
import NecktieSvg from "@/components/ui/icons/decorations/discipline/necktie-svg";
import RectGlassesSvg from "@/components/ui/icons/decorations/discipline/rect-glasses-svg";
import CoatSvg from "@/components/ui/icons/decorations/responsibilities/coat-svg";
import HeadphonesSvg from "@/components/ui/icons/decorations/responsibilities/headphones-svg";
import RoundedGlassesSvg from "@/components/ui/icons/decorations/responsibilities/rounded-glasses-svg";
import CapeSvg from "@/components/ui/icons/decorations/self-confidence/cape-svg";
import CapSvg from "@/components/ui/icons/decorations/volunteer/cap-svg";
import ScarfSvg from "@/components/ui/icons/decorations/volunteer/scarf-svg";
import StudentBoyHappySvg from "@/components/ui/icons/student/boy/happy-svg";
import StudentGirlHappySvg from "@/components/ui/icons/student/girl/happy-svg";
import { Color } from "@/constants/theme/color";
import { isMan } from "@/shared/utils/gender-util";
import { Star } from "phosphor-react-native";
import { View } from "react-native";

interface StudentCharacterProps {
    gender: string
    aptitude: string
    aptitudeColor: string
    aptitudeColor2: string
}

// StudentCharacter component extracted and cleaned up
export default function StudentCharacter({ gender, aptitude, aptitudeColor, aptitudeColor2 }: Readonly<StudentCharacterProps>) {
    const Student = ({ neck = false, turtleNeck = false }) => (
        <View className="justify-center items-center">
            {isMan(gender) ? (
                <StudentBoyHappySvg width={150} height={142} />
            ) : (
                <StudentGirlHappySvg
                    width={150} 
                    height={142} 
                    ribbonPrimaryColor={aptitudeColor} 
                    ribbonSecondaryColor={aptitudeColor2} 
                />
            )}
            <BodySvg clothColor={aptitudeColor} neck={neck} turtleNeck={turtleNeck} />
        </View>
    );

    return (
        <View className="w-full h-[240] justify-center items-center">
            <MemoSwitch test={aptitude}>
                <MemoCase value={(aptitude) => aptitude === "จิตอาสา"}>
                    <Student />
                    <View className="absolute top-0">
                        <CapSvg />
                    </View>
                    <View className="absolute bottom-10">
                        <ScarfSvg />
                    </View>
                </MemoCase>
                <MemoCase value={(aptitude) => aptitude === "ความกล้าแสดงออก"}>
                    <View className="absolute bottom-4">
                        <CapeSvg />
                    </View>
                    <Student neck />
                    <View className="absolute bottom-10">
                        <Star color={Color["primary-1"]} size={24} weight="fill" />
                    </View>
                </MemoCase>
                <MemoCase value={(aptitude) => aptitude === "ความแข่งขัน"}>
                    <Student />
                    <View className="absolute top-16">
                        <HeadbandSvg />
                    </View>
                    <View className="absolute bottom-7">
                        <MedallaceSvg />
                    </View>
                </MemoCase> 
                <MemoCase value={(aptitude) => aptitude === "ความมีระเบียบวินัย"}>
                    <Student turtleNeck />
                    <View className="absolute w-[150] bottom-[6.7rem] left-[4.5rem]">
                        <RectGlassesSvg />
                    </View>
                    <View className="absolute bottom-[1.75rem]">
                        <NecktieSvg />
                    </View>
                </MemoCase> 
                <MemoCase value={(aptitude) => aptitude === "ความรับผิดชอบ"}>
                    <View className="absolute top-10">
                        <HeadphonesSvg />
                    </View>
                    <Student neck />
                    <View className="absolute w-[150] bottom-[6.7rem] left-[4.5rem]">
                        <RoundedGlassesSvg/>
                    </View>
                    <View className="absolute bottom-4">
                        <CoatSvg />
                    </View>
                </MemoCase> 
                <MemoCase value={(aptitude) => aptitude === "ความเป็นผู้นำ"}>
                    <Student turtleNeck />
                    <View className="absolute top-0">
                        <CrownSvg width={90} height={75} />
                    </View>
                </MemoCase> 
                <MemoCase default><Student /></MemoCase>
            </MemoSwitch>
        </View>
    );
};