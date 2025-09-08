import { Color } from "@/constants/theme/color"
import Svg, { Circle, Path } from "react-native-svg"

interface CapSvgProps {
    primaryColor?: string
    secondaryColor?: string
    width?: number
    height?: number
}

export default function CapSvg({ 
    width = 100,
    height = 77, 
    primaryColor = Color["system-blue"],
    secondaryColor=  Color["primary-1"] 
}: Readonly<CapSvgProps>) {
    return (
        <Svg width={width} height={height} viewBox="0 0 100 77" fill="none">
            <Path d="M0 50C0 27.9086 17.9086 10 40 10H60C82.0914 10 100 27.9086 100 50V64H0V50Z" fill={primaryColor}/>
            <Circle cx="50" cy="38" r="13.5" stroke={Color["system-white"]} strokeWidth="3"/>
            <Path d="M57 36.875C57 41.25 50.5131 44.7913 50.2369 44.9375C50.1641 44.9767 50.0827 44.9972 50 44.9972C49.9173 44.9972 49.8359 44.9767 49.7631 44.9375C49.4869 44.7913 43 41.25 43 36.875C43.0012 35.8476 43.4098 34.8627 44.1362 34.1362C44.8627 33.4098 45.8476 33.0012 46.875 33C48.1656 33 49.2956 33.555 50 34.4931C50.7044 33.555 51.8344 33 53.125 33C54.1524 33.0012 55.1373 33.4098 55.8638 34.1362C56.5902 34.8627 56.9988 35.8476 57 36.875Z" fill={Color["system-white"]}/>
            <Path d="M40 10C40 4.47715 44.4772 0 50 0C55.5228 0 60 4.47715 60 10H40Z" fill={secondaryColor}/>
            <Path d="M100 64.5C100 67.8152 94.7322 70.9946 85.3553 73.3388C75.9785 75.683 63.2608 77 50 77C36.7392 77 24.0215 75.683 14.6447 73.3388C5.26785 70.9946 2.00233e-06 67.8152 0 64.5L50 64.5H100Z" fill={secondaryColor}/>
            <Path d="M0 65C0 62.2386 2.23858 60 5 60H95C97.7614 60 100 62.2386 100 65H0Z" fill={secondaryColor}/>
        </Svg>
    )
}