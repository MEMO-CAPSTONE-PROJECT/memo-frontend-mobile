// import BrandingBackground from "@/components/background/branding-background";
// import MemoTextButton from "@/components/button/memo-text-button";
// import MemoCard from "@/components/container/memo-card";
// import { Color } from "@/constants/theme/color";
// import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from "expo-camera";
// import { CameraRotate } from "phosphor-react-native";
// import { useState } from "react";
// import { Alert, Text, TouchableOpacity, View } from "react-native";

import BrandingBackground from "@/components/background/branding-background";
import MemoCard from "@/components/container/memo-card";
import { Text } from "react-native";

export default function StudentQRCodeScannerScreen() {
    return (
        <BrandingBackground>
            <MemoCard size="full" className="justify-center items-center">
                <Text className="font-kanit-medium">Future release</Text>
            </MemoCard>
        </BrandingBackground>
    )
    // const [facing, setFacing] = useState<CameraType>("back")
    // const [permission, requestPermission] = useCameraPermissions()

    // if (!permission) {
    //     return <View></View>
    // }

    // if (!permission?.granted) {
    //     return (
    //         <BrandingBackground variant="secondary">
    //             <MemoCard size="full" containerRounded={false} className="justify-center items-center">
    //                 <Text className="font-kanit-medium text-body text-title-1">ต้องการเข้าถึงกล้องเพื่อใช้สแกน QR รับคะแนน</Text>
    //                 <MemoTextButton name="อนุญาตการเข้าถึงกล้อง" onPress={requestPermission}/>
    //             </MemoCard>
    //         </BrandingBackground>
    //     )
    // }

    // function flipCamera() {
    //     setFacing(current => (current === 'back' ? 'front' : 'back'))
    // }

    // function handleBarCodeScanned(result: BarcodeScanningResult) {
    //     Alert.alert('Barcode Scanned', result.data, [
    //         {
    //           text: 'Cancel',
    //           onPress: () => console.log('Cancel Pressed'),
    //           style: 'cancel',
    //         },
    //         {text: 'OK', onPress: () => console.log('OK Pressed')},
    //       ])
    // }

    // return (
    //     <BrandingBackground variant="secondary">
    //         <MemoCard size="full" containerRounded={false} className="!p-0 !pt-0">
    //             <View className="bg-title-1 opacity-50 h-full justify-center items-center">
    //                 <CameraView
    //                     barcodeScannerSettings={{
    //                         barcodeTypes: ["qr"],
    //                     }}
    //                     onBarcodeScanned={handleBarCodeScanned}
    //                     facing={facing}
    //                 >
    //                     <TouchableOpacity onPress={flipCamera} className="absolute top-4 right-4 bg-system-white flex-row gap-x-sm p-md rounded-sm">
    //                         <CameraRotate color={Color["title-1"]} weight="bold"/>
    //                         <Text className="font-kanit-medium text-body text-title-1">กลับกล้อง</Text>
    //                     </TouchableOpacity>
    //                 </CameraView>
    //             </View>
    //         </MemoCard>
    //     </BrandingBackground>
    // )
}