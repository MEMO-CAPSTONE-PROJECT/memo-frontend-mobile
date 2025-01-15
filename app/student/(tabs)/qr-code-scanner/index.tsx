import BrandingBackground from "@/components/background/branding-background";
import MemoTextButton from "@/components/button/memo-text-button";
import MemoCard from "@/components/container/memo-card";
import { Color } from "@/constants/theme/color";
import { useIsFocused } from "@react-navigation/native";
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Barcode, CameraRotate } from "phosphor-react-native";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function StudentQRCodeScannerScreen() {
    const isFocused = useIsFocused()
    const [isScanned, setIsScanned] = useState(false)
    const [facing, setFacing] = useState<CameraType>("back")
    const [permission, requestPermission] = useCameraPermissions()

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

    function handleBarCodeScanned(result: BarcodeScanningResult) {
        setIsScanned(true)
        Alert.alert('Barcode Scanned', result.data, [
            {
                text: 'Cancel',
                onPress: () => {
                    setIsScanned(false)
                    console.log('Cancel Pressed')
                },
                style: 'cancel',
            },
            {
                text: 'OK', 
                onPress: () => {
                    setIsScanned(false)
                    console.log('OK Pressed')
                }
            },
          ])
    }

    return (
        <BrandingBackground variant="secondary">
            <MemoCard size="full" containerRounded={false} className="!p-0 !pt-0">
                <View className="w-full h-full justify-center items-center">
                    {isFocused && <CameraView 
                        barcodeScannerSettings={{
                            barcodeTypes: ["qr"],
                        }}
                        onBarcodeScanned={isScanned ? undefined : handleBarCodeScanned}
                        style={{height: "100%", width: "100%"}}
                        facing={facing}
                    />}
                    <View className="absolute">
                        <Barcode size={256} weight="light" color={Color["system-white"]}/>
                    </View>
                    <TouchableOpacity onPress={flipCamera} className="absolute top-6 right-4 bg-system-white flex-row gap-x-sm p-md rounded-sm">
                        <CameraRotate color={Color["title-1"]} weight="bold"/>
                        <Text className="font-kanit-medium text-body text-title-1">กลับกล้อง</Text>
                    </TouchableOpacity>
                </View>
            </MemoCard>
        </BrandingBackground>
    )
}