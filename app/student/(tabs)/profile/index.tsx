import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoBaseNavigatorCard from "@/components/container/base/memo-base-navigator-card";
import MemoCard from "@/components/container/memo-card";
import ScrollableView from "@/components/scrollable/scrollable-view";
import BodySvg from "@/components/ui/icons/body-svg";
import StudentBoyDefaultSvg from "@/components/ui/icons/student/boy/default-svg";
import StudentGirlDefaultSvg from "@/components/ui/icons/student/girl/default-svg";
import { Color } from "@/constants/theme/color";
import useAuth from "@/context/useAuth";
import { useStudentToken } from "@/hooks/useUserToken";
import { randomHexColor } from "@/shared/utils/color-util";
import { isMan } from "@/shared/utils/gender-util";
import { router } from "expo-router";
import { CheckCircle, GenderFemale, GenderMale } from "phosphor-react-native";
import { Fragment, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function StudentProfileScreen() {
    const auth = useAuth()
    const { data: student } = useStudentToken()
    const [scrollEnabled, setScrollEnabled] = useState(true)
    const [gender, setGender] = useState(student?.gender ?? "male")
    const [changeMode, setChangeMode] = useState<"skin" | "hair" | "cloth">("skin")
    const [skinColor, setSkinColor] = useState(Color["secondary-4"])
    const [hairColor, setHairColor] = useState(Color["title-1"])
    const [clothColor, setClothColor] = useState(Color["primary-2"])

    async function handleLogout() {
        auth.logout()
        router.replace("/")
    }

    function handleChangeSkinColor() {
        setChangeMode("skin")
    }
    function handleChangeHairColor() {
        setChangeMode("hair")
    }
    function handleChangeClothColor() {
        setChangeMode("cloth")
    }
    function handleChangeGender(gender: string) {
        setGender(gender)
    }
    function handleColorChange(color: string) {
        setScrollEnabled(false)
        if (changeMode === "skin") setSkinColor(color)
        else if (changeMode === "hair") setHairColor(color)
        else if (changeMode === "cloth") setClothColor(color)
    }
    const getColor = () => {
        if (changeMode === "skin") return skinColor
        else if (changeMode === "hair") return hairColor
        else if (changeMode === "cloth") return clothColor
        return Color["secondary-4"]
    }
    const COLORS = Object.values(Color)

    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" className="!pt-0 !p-0">
                <ScrollableView border={false} className="gap-y-lg p-[1.5rem]">
                    <View className="items-center">
                        {
                            isMan(gender) ?
                                <StudentBoyDefaultSvg width={155} height={147}
                                    skinColor={skinColor}
                                    hairColor={hairColor}
                                /> :
                                <StudentGirlDefaultSvg width={155} height={147}
                                    skinColor={skinColor}
                                    hairColor={hairColor}
                                    ribbonPrimaryColor={clothColor}
                                    ribbonSecondaryColor={clothColor}
                                />
                        }
                        <BodySvg
                            skinColor={skinColor}
                            clothColor={clothColor}
                        />
                    </View>
                    <View className="flex-row justify-center gap-x-md">
                        <TouchableOpacity
                            className="items-center justify-center rounded-circle bg-system-error w-8 h-8"
                            onPress={() => handleChangeGender("female")}
                        >
                            <GenderFemale weight="bold" color={Color["system-white"]} size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="items-center justify-center rounded-circle bg-system-blue-2 w-8 h-8"
                            onPress={() => handleChangeGender("male")}
                        >
                            <GenderMale weight="bold" color={Color["system-white"]} size={20} />
                        </TouchableOpacity>
                    </View>
                    <MemoBaseNavigatorCard className="flex-col overflow-hidden gap-md" disabled={true} disabledStyled={false}>
                        <View className="flex-row gap-x-md">
                            <MemoButton name="สีผิว" variant={changeMode === "skin" ? "primary" : "ghost"} onPress={handleChangeSkinColor} size="full" />
                            <MemoButton name="สีผม" variant={changeMode === "hair" ? "primary" : "ghost"} onPress={handleChangeHairColor} size="full" />
                            <MemoButton name="สีเสื้อ" variant={changeMode === "cloth" ? "primary" : "ghost"} onPress={handleChangeClothColor} size="full" />
                        </View>
                        <View className="flex flex-row flex-wrap justify-stretch gap-sm">
                            {COLORS.map((color, index) => {
                                return (
                                    <Fragment key={color + "_" + index}>
                                        <TouchableOpacity
                                            className={`relative h-10 w-10 rounded-xsm border-2xsm border-system-gray`} 
                                            style={{ backgroundColor: color }}
                                            onPress={() => handleColorChange(color)}
                                        >
                                            {color === getColor() && <View className="z-20 absolute -right-2 -top-2 rounded-circle border-xsm border-body-1 bg-system-white">
                                                <CheckCircle weight="fill" color={Color["system-green"]} size={16} />
                                            </View>}
                                        </TouchableOpacity>
                                    </Fragment>
                                )                      
                            })}
                            <TouchableOpacity
                                className={`h-10 w-10 items-center justify-center border-xsm border-body-1 rounded-xsm`}
                                onPress={() => handleColorChange(randomHexColor())}
                            >
                                <Text className="font-kanit-medium ">สุ่ม</Text>
                            </TouchableOpacity>
                        </View>
                    </MemoBaseNavigatorCard>
                    <MemoButton name="ออกจากระบบ" variant="primary" onPress={handleLogout} />
                </ScrollableView>
            </MemoCard>
        </BrandingBackground>
    )
}