import { Color } from "@/constants/theme/color"
import Svg, { Path } from "react-native-svg"

interface CoatSvgProps {
    primaryColor?: string
    width?: number
    height?: number
}

export default function CoatSvg({ 
    width = 115,
    height = 64, 
    primaryColor = Color["system-dark-orange"],
}: Readonly<CoatSvgProps>) {
    return (
        <Svg width={width} height={height} viewBox="0 0 115 64" fill="none">
            <Path d="M0 42C0 21.0132 17.0132 4 38 4V64H0V42Z" fill={primaryColor}/>
            <Path d="M115 42C115 21.0132 97.9868 4 77 4V64H115V42Z" fill={primaryColor}/>
            <Path d="M76.6484 4.01094C76.9563 2.71287 75.5435 1.68887 74.4057 2.38543L58.0428 12.4029C56.9281 13.0854 57.1588 14.7679 58.4161 15.1251L71.5197 18.848C72.3415 19.0815 73.192 18.5825 73.3892 17.7513L76.6484 4.01094Z" fill={primaryColor}/>
            <Path d="M38.2629 4.01093C37.955 2.71287 39.3678 1.68887 40.5056 2.38543L56.8685 12.4029C57.9833 13.0854 57.7526 14.7679 56.4953 15.1251L43.3917 18.848C42.5699 19.0815 41.7194 18.5825 41.5222 17.7513L38.2629 4.01093Z" fill={primaryColor}/>
        </Svg>
    )
}