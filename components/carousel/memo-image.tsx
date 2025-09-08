import { Color } from "@/constants/theme/color"
import { ArrowClockwise } from "phosphor-react-native"
import { memo, useState } from "react"
import { ActivityIndicator, Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native"

interface MemoImageCarouselItemProps {
    uri: string
    onPress?: () => void
    onLoadEnd?: () => void
    onError?: () => void
    onReload?: () => void
    height?: number
    width?: number
}

function MemoImage({
    uri,
    height,
    width,
    onPress,
    onLoadEnd,
    onError,
    onReload
}: Readonly<MemoImageCarouselItemProps>) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [image, setImage] = useState(uri)

    const handleImageLoaded = () => {
        setLoading(false)
        onLoadEnd?.()
    }

    const handleImageError = () => {
        setError(true)
        onError?.()
    }

    const handleReloadImage = () => {
        setError(false)
        setLoading(true)
        setImage(`${uri}?timestamp=${Date.now()}`)
        onReload?.()
    }

    return (
        <View className="bg-system-gray z-10" style={{ height, width }}>
            <Pressable
                className={`${error ? "pointer-events-none" : ""} w-full h-full`}
                style={{ height, width }}
                onPress={onPress}
            >
                {<Image
                    className="h-full w-full"
                    onLoadEnd={handleImageLoaded}
                    onError={handleImageError}
                    source={{ uri: image }}
                />}
            </Pressable>
            {loading && (
                <View style={[
                    { ...StyleSheet.absoluteFillObject },
                    { alignItems: "center", justifyContent: "center" }
                ]}>
                    <ActivityIndicator color={Color["title-1"]}/>
                </View>
            )}
            {(error && !loading) && (
                <View style={[
                    { ...StyleSheet.absoluteFillObject },
                    { alignItems: "center", justifyContent: "center", zIndex: 20 }
                ]}>
                    <TouchableOpacity onPress={handleReloadImage} className="z-20">
                        <ArrowClockwise size={24} color={Color["title-1"]} weight="bold" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default memo(MemoImage)