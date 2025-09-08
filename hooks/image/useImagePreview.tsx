import { MediaPreview, openPreview, PreviewConfig } from "@baronha/react-native-multiple-image-picker"
import { useMemo } from "react"
import { ImageURISource } from "react-native"


export default function useImagePreview(images: ImageURISource[], baseUrl: string) {
    const media: MediaPreview[] = useMemo(() => images.map(uri => ({ 
        path: baseUrl + uri.uri, 
        type: "image" 
    })), [baseUrl, images])
    
    const handleImagePreview = (index: number) => {
        const previewConfig: PreviewConfig = {
            language: "th",
        }
        openPreview(media, index, previewConfig)
    }
    
    return {
        media,
        handleImagePreview
    }
}