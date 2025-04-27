import BrandingBackground from "@/components/background/branding-background";
import MemoTextButton from "@/components/button/memo-text-button";
import MemoCard from "@/components/container/memo-card";
import MemoRewardModal from "@/components/ui/modal/memo-reward-modal";
import { Color } from "@/constants/theme/color";
import { useModal } from "@/context/useModal";
import { useStudentAchievementsQuery } from "@/hooks/achievement/useAchievementQuery";
import { useSubmitAchievementCodeMutation } from "@/hooks/mutation/useCodeMutation";
import { useStudentToken } from "@/hooks/useUserToken";
import { StudentScore } from "@/shared/types/achievement-type";
import { useIsFocused } from "@react-navigation/native";
import { AxiosError } from "axios";
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { CameraRotate, Lightning, LightningSlash } from "phosphor-react-native";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Svg, { Defs, Mask, Rect } from "react-native-svg";

function QRCodeScannerBox() {
    const QR_SCAN_SQUARE_SIZE = 200
    const { height: deviceHeight, width: deviceWidth } = useWindowDimensions()
    
    return (
        <View className="absolute w-full h-full justify-center items-center z-20">
            <Svg height="100%" width="100%">
                <Defs>
                    <Mask id="mask" x="0" y="0" height="100%" width="100%">
                        <Rect height="100%" width="100%" fill={Color["system-white"]}/>
                        <Rect
                            x={(deviceWidth / 2) - (QR_SCAN_SQUARE_SIZE / 2)}
                            y={(deviceHeight / 2.5) - (QR_SCAN_SQUARE_SIZE / 2)}
                            rx="20"
                            ry="20"
                            width={QR_SCAN_SQUARE_SIZE}
                            height={QR_SCAN_SQUARE_SIZE}
                        />
                    </Mask>
                </Defs>
                <Rect height="100%" width="100%" mask="url(#mask)" fill={"rgba(0,0,0,0.5)"}/>
            </Svg>
        </View>
    )
}

export default function StudentQRCodeScannerScreen() {
    const isFocused = useIsFocused()
    const [isFlash, setIsFlash] = useState(false)
    const [isScanned, setIsScanned] = useState(false)
    const [facing, setFacing] = useState<CameraType>("back")
    const [permission, requestPermission] = useCameraPermissions()
    const { showModal } = useModal()

    const { data: student } = useStudentToken()
    const { mutateAsync: submitCode } = useSubmitAchievementCodeMutation()
    const { refetch: refetchAchievements } = useStudentAchievementsQuery({ studentId: student?.sub })
    
    if (!permission) {
        return <View></View>
    }

    if (!permission?.granted) {
        return (
            <BrandingBackground variant="secondary">
                <MemoCard size="full" containerRounded={false} className="justify-center items-center">
                    <Text className="font-kanit-medium text-body text-title-1">ต้องการเข้าถึงกล้องเพื่อใช้สแกน QR รับคะแนน</Text>
                    <MemoTextButton name="อนุญาตการเข้าถึงกล้อง" onPress={requestPermission}/>
                </MemoCard>
            </BrandingBackground>
        )
    }

    function flipCamera() {
        setFacing(current => (current === 'back' ? 'front' : 'back'))
    }

    function handleFlash() {
        setIsFlash(!isFlash)
    }

    const handleOpenRewardModal = (rewards: StudentScore[]) => showModal(() => {
        return <MemoRewardModal rewards={rewards} onConfirm={() => setIsScanned(false)}/>
    })

    async function handleBarCodeScanned(rawResult: BarcodeScanningResult) {
        try {
            setIsScanned(true)
            const result = JSON.parse(rawResult.data) as { achievementId: string, code?: string }
            const response =  await submitCode({
                studentId: String(student?.sub ?? ""),
                achievementId: result.achievementId,
                code: result.code ?? ""
            })
            if (response) {
                handleOpenRewardModal(response.data.totalScore)
                refetchAchievements()
            } else {
                Alert.alert("ล้มเหลว", "คิวอาร์โค้ดไม่ถูกต้อง", [
                    { text: "ตกลง", style: "cancel", onPress: () => { setIsScanned(false) } }
                ])
            }
        } catch (error) {
            console.log(error)

            const errorMessage = error instanceof AxiosError ? error.response?.data?.error : "คิวอาร์โค้ดไม่ถูกต้อง"
            Alert.alert("ล้มเหลว", errorMessage ?? "ไม่พบรหัสนี้หรือไม่ได้ลงทะเบียน", [
                { text: "ตกลง", style: "cancel", onPress: () => { setIsScanned(false) }, }
            ])
        }
    }

    const FlashIcon = isFlash ? Lightning : LightningSlash

    return (
        <BrandingBackground variant="secondary">
            <View className="w-full h-full justify-center items-center">
                <QRCodeScannerBox />
                {isFocused && <CameraView
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                    }}
                    onBarcodeScanned={isScanned ? undefined : handleBarCodeScanned}
                    style={{ height: "100%", width: "100%" }}
                    facing={facing}
                    enableTorch={isFlash}
                />}
                <TouchableOpacity onPress={flipCamera} className="absolute z-30 w-16 h-16 bottom-6 right-6 rounded-circle border-system-white border-md justify-center items-center">
                    <CameraRotate size={32} color={Color["system-white"]} weight="bold"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFlash} className="absolute z-30 w-16 h-16 bottom-6 left-6 rounded-circle border-system-white border-md justify-center items-center">
                    <FlashIcon size={32} color={Color["system-white"]} weight="bold"/>
                </TouchableOpacity>
            </View>
        </BrandingBackground>
    )
}