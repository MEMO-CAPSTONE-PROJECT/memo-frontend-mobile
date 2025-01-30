import BrandingBackground from "@/components/background/branding-background";
import MemoTextButton from "@/components/button/memo-text-button";
import MemoCard from "@/components/container/memo-card";
import { Color } from "@/constants/theme/color";
import { useCreateStudentScoreByCode } from "@/hooks/useCode";
import { useStudentToken } from "@/hooks/useUserToken";
import { useIsFocused } from "@react-navigation/native";
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { CameraRotate, Lightning, LightningSlash } from "phosphor-react-native";
import { useState } from "react";
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";
import Svg, { Defs, Mask, Rect } from "react-native-svg";

function QRCodeScannerBox() {
    const QR_SCAN_SQUARE_SIZE = 250
    const deviceHeight = Dimensions.get("window").height
    const deviceWidth = Dimensions.get("window").width
    
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

    const { data: student } = useStudentToken()
    const { mutateAsync: createStudentScoreByCode } = useCreateStudentScoreByCode()

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

    async function handleBarCodeScanned(rawResult: BarcodeScanningResult) {
        setIsScanned(true)
        const result = JSON.parse(rawResult.data) as { achievementId: string, code?: string }
        const response = await createStudentScoreByCode({
            studentId: student?.sub ?? "",
            achievementId: result.achievementId,
            code: result.code ?? ""
        })

        if (response) {
            Alert.alert('Barcode Successfully', result.code, [
                {
                    text: 'Cancel',
                    onPress: () => { setIsScanned(false) },
                    style: 'cancel',
                },
                {
                    text: 'OK', 
                    onPress: () => { setIsScanned(false) }
                },
              ])
        } else {
            Alert.alert('Barcode Failed', result.code, [
                {
                    text: 'Cancel',
                    onPress: () => { setIsScanned(false) },
                    style: 'cancel',
                },
                {
                    text: 'OK', 
                    onPress: () => { setIsScanned(false) }
                },
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