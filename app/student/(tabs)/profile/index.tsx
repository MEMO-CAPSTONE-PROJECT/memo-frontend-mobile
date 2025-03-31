import BrandingBackground from "@/components/background/branding-background";
import MemoButton from "@/components/button/memo-button";
import MemoCard from "@/components/container/memo-card";
import BodySvg from "@/components/ui/icons/body-svg";
import StudentBoyDefaultSvg from "@/components/ui/icons/student/boy/default-svg";
import StudentGirlDefaultSvg from "@/components/ui/icons/student/girl/default-svg";
import { Color } from "@/constants/theme/color";
import useAuth from "@/context/useAuth";
import { useStudentToken } from "@/hooks/useUserToken";
import { randomHexColor } from "@/shared/utils/color-util";
import { isMan } from "@/shared/utils/gender-util";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function StudentProfileScreen() {
    const auth = useAuth()
    const { data: student } = useStudentToken()
    const [skinColor, setSkinColor] = useState(Color["secondary-4"])
    const [hairColor, setHairColor] = useState(Color["title-1"])
    const [clothColor, setClothColor] = useState(Color["primary-2"])
    
    async function handleLogout() {
        auth.logout()
        router.replace("/")
    }
    
    function handleChangeSkinColor() {
        setSkinColor(randomHexColor())
    }
    function handleChangeHairColor() {
        setHairColor(randomHexColor())
    }
    function handleChangeClothColor() {
        setClothColor(randomHexColor())
    }

    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" className="gap-y-xl">
                <View className="items-center">
                    {
                         isMan(student?.gender ?? "") ? 
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
                {/* <MemoRGBHexPicker/> */}
                <MemoButton name="เปลื่ยนสีผิว" variant="ghost" onPress={handleChangeSkinColor} />
                <MemoButton name="เปลื่ยนสีผม" variant="ghost" onPress={handleChangeHairColor} />
                <MemoButton name="เปลื่ยนสีเสื่อ" variant="ghost" onPress={handleChangeClothColor} />
                <MemoButton name="ออกจากระบบ" variant="primary" onPress={handleLogout} />
            </MemoCard>
        </BrandingBackground>
    )
}