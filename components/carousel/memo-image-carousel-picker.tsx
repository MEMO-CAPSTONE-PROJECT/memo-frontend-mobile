import MemoImage from "@/components/carousel/memo-image";
import ScrollableView from "@/components/scrollable/scrollable-view";
import { Color } from "@/constants/theme/color";
import useImagePreview from "@/hooks/image/useImagePreview";
import { BaseURL } from "@/shared/api-handler";
import { ImageSquare, X } from "phosphor-react-native";
import { ImageURISource, Pressable, Text, View } from "react-native";

interface MemoImageCarouselPickerProps {
    baseUrl?: string
    images: ImageURISource[]
    indicator?: boolean
    onPick?: () => void
    onRemove?: (index: number) => void
}

export default function MemoImageCarouselPicker({ baseUrl = BaseURL, images, onPick, onRemove, indicator = true }: Readonly<MemoImageCarouselPickerProps>) {
    const { handleImagePreview } = useImagePreview(images, baseUrl)
    const container = images.length > 0 ? "" : "w-full"
    const width = images.length > 0 ? "w-32" : "w-full"

    return (
        <View className="gap-y-md">
            {indicator && (
                <View className="items-start w-full">
                    <Text className="text-caption-2 font-kanit-medium">รูปภาพทั้งหมดมี {images.length} รูปภาพ</Text>
                </View>)
            }
            <ScrollableView
                containerClassName={container}
                scrollEnabled={images.length > 1}
                horizontal
                showScrollIndicator={false}
                border={false}
            >
                <View className="flex-1 justify-center items-center flex-row gap-x-xl">
                    {onPick && <Pressable
                        className={`${width} h-32 rounded-sm border-xsm border-body-2 border-dotted justify-center items-center`}
                        onPress={onPick}
                    >
                        <ImageSquare size={32} color={Color["body-2"]} />
                        <Text className="font-kanit-medium text-body-2 text-caption-1">เพิ่มรูปภาพ</Text>
                    </Pressable>}
                    {images.map((image, index) =>
                        <View key={"image_" + index} className="w-32 h-32 rounded-sm overflow-hidden">
                            <MemoImage
                                uri={baseUrl + image.uri}
                                onPress={() => handleImagePreview(index)}
                            />
                            {onRemove && <Pressable
                                className="absolute z-20 top-0 right-0 p-sm justify-center items-center rounded-bl-sm bg-title-1/50"
                                onPress={() => onRemove(index)}
                            >
                                <X size={20} color={Color["system-white"]} weight="bold" />
                            </Pressable>}
                        </View>
                    )}
                </View>
            </ScrollableView>
        </View>
    )
}