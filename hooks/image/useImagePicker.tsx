import { Color } from "@/constants/theme/color";
import { Config, openPicker, PickerResult } from "@baronha/react-native-multiple-image-picker";
import { useState } from "react";

export default function useImagePicker(initialImages?: PickerResult[]) {
    const [images, setImages] = useState<PickerResult[]>(initialImages || []);
    const config: Config = {
        maxSelect: 3,
        primaryColor: Color["primary-2"],
        backgroundDark: Color["system-light-gray"],
        numberOfColumn: 4,
        mediaType: 'image',
        selectBoxStyle: 'number',
        selectMode: 'multiple',
        language: "th",
        theme: 'light',
        isHiddenOriginalButton: false,
        selectedAssets: images
      }

    const handlePickImage = async (
        options?: {
            onSuccess?: (result: PickerResult[]) => void
            onError?: (error: unknown) => void
        }
    ) => {
        try {
           const result = await openPicker(config)
           setImages([])
           setImages(result)
           options?.onSuccess?.(result)
        } catch (error) {
            console.log(error)
            options?.onError?.(error)
        }
    }
    return {
        images,
        setImages,
        handlePickImage
    }
}