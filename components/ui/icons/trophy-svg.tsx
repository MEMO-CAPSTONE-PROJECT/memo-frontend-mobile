import { Color } from "@/constants/theme/color"
import { View } from "react-native"
import Svg, { Path, Rect } from "react-native-svg"

interface TrophySvgProps {
    width: number
    height: number
    className?: string
}

export default function TrophySvg({ width, height, className = "" }: Readonly<TrophySvgProps>) {
    return (
        <View className={className}>
            <Svg width={width} height={height} viewBox="0 0 76 140" fill="none">
                <Rect x="1" y="125" width="75" height="15" rx="5" fill={Color["system-dark-brown"]} />
                <Rect x="8" y="86" width="60" height="30" rx="5" fill={Color["system-brown"]} />
                <Rect x="8" y="95" width="60" height="30" fill={Color["system-brown"]} />
                <Rect x="16" y="94" width="45" height="24" rx="2.5" fill={Color["system-white"]} />
                <Rect x="23" y="78" width="30" height="7" rx="2.5" fill={Color["secondary-2"]}/>
                <Rect x="23" y="82" width="30" height="4" fill={Color["secondary-2"]}/>
                <Rect x="32" y="63" width="12" height="15" fill={Color["secondary-1"]} />
                <Rect x="23" y="57" width="30" height="10" rx="2.5" fill={Color["secondary-2"]}/>
                <Path d="M72.7419 25.917C72.7419 23.1882 70.554 20.9634 67.8256 20.9177L38.9825 20.4349C35.2203 20.3719 34.4708 25.7346 38.1061 26.7056C38.3676 26.7755 38.637 26.8117 38.9077 26.8135L63.742 26.9799C65.4021 26.991 66.7419 28.3399 66.7419 30V34V39C66.7419 40.627 65.423 41.9459 63.796 41.9459H39.5945C39.3656 41.9459 39.1374 41.9719 38.9143 42.0234C35.4037 42.833 35.9918 48 39.5945 48H67.7419C70.5034 48 72.7419 45.7614 72.7419 43V34V25.917Z" fill={Color["secondary-2"]}/>
                <Path d="M3 25.917C3 23.1882 5.1879 20.9634 7.91632 20.9177L36.7595 20.4349C40.5216 20.3719 41.2711 25.7346 37.6359 26.7056C37.3743 26.7755 37.1049 26.8117 36.8342 26.8135L11.9999 26.9799C10.3399 26.991 9 28.3399 9 30V34V39C9 40.627 10.3189 41.9459 11.9459 41.9459H36.1474C36.3764 41.9459 36.6046 41.9719 36.8277 42.0234C40.3382 42.833 39.7501 48 36.1474 48H8C5.23857 48 3 45.7614 3 43V34V25.917Z" fill={Color["secondary-2"]}/>
                <Rect x="14" y="38" width="48" height="24" rx="5" fill={Color["secondary-1"]} />
                <Rect x="14" y="12" width="48" height="36" fill={Color["secondary-1"]} />
                <Rect x="8" y="2" width="60" height="15" rx="2.5" fill={Color["secondary-2"]}/>
                <Rect x="47" width="11" height="16.5797" rx="1.5" fill={Color["system-error-2"]} />
                <Path d="M50.0315 15.1036C49.3944 14.4758 49.839 13.3914 50.7334 13.3914H56.9999C57.5522 13.3914 57.9999 13.8391 57.9999 14.3914V19.9006C57.9999 20.7423 57.0234 21.2075 56.3698 20.677L52.4999 17.5363L50.0315 15.1036Z" fill={Color["system-error-2"]} />
                <Path d="M54.9685 15.1036C55.6056 14.4758 55.161 13.3914 54.2666 13.3914H48C47.4478 13.3914 47 13.8391 47 14.3914V19.9006C47 20.7423 47.9766 21.2075 48.6302 20.677L52.5 17.5363L54.9685 15.1036Z" fill={Color["system-error-2"]} />
            </Svg>
        </View>
    )
}