import { Text, TouchableOpacity, View } from "react-native";
import { ToastConfig } from "react-native-toast-message";

export const toastConfig: ToastConfig = {
    normal: ({ text1, text2, onPress, props }) => (
        <TouchableOpacity style={{ width: 340, height: "auto" }} onPress={onPress}>
            <View className="flex-1 flex-row bg-system-white rounded-sm p-lg gap-x-lg">
                {props?.icon}
                <View className="w-full flex-col flex-wrap justify-center">
                    <Text className="font-kanit-bold text-body text-body-1">{text1}</Text>
                    <Text className="font-kanit-medium text-caption-1 text-body-2">{text2}</Text>
                </View>
            </View>
        </TouchableOpacity>
      )
}