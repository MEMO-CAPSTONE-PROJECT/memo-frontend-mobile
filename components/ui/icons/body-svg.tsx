import { Color } from "@/constants/theme/color";
import Svg, { Path, Rect } from "react-native-svg";

interface BodySvgProps {
    width?: number
    height?: number
    skinColor?: string
    clothColor?: string
    neck?: boolean
    turtleNeck?: boolean
}

export default function BodySvg({ 
    width = 116 , height = 69, 
    clothColor = Color["primary-2"], 
    skinColor = Color["secondary-4"],
    neck = false,
    turtleNeck = false,
}: Readonly<BodySvgProps>) {
    return (
        <Svg width={width} height={height} viewBox="0 0 115 69" fill="none" >
            <Path y="-1" d="M0 49C0 26.9086 17.9086 9 40 9H75C97.0914 9 115 26.9086 115 49V69H0V49Z" fill={clothColor}/>
            <Rect x="40" width="35" height="8" fill={skinColor}/>
            {neck && 
                <Path y="-1" d="M75 9C75 10.1819 74.5473 11.3522 73.6679 12.4442C72.7884 13.5361 71.4994 14.5282 69.8744 15.364C68.2493 16.1997 66.3202 16.8626 64.197 17.3149C62.0738 17.7672 59.7981 18 57.5 18C55.2019 18 52.9262 17.7672 50.803 17.3149C48.6798 16.8626 46.7507 16.1997 45.1256 15.364C43.5006 14.5282 42.2116 13.5361 41.3321 12.4441C40.4527 11.3522 40 10.1819 40 9L57.5 9H75Z" fill={skinColor}/>
            }
            {turtleNeck &&
                <Path y="-1" d="M77 10L37 10L37 9C37 6.23858 39.2386 4 42 4L72 4C74.7614 4 77 6.23858 77 9L77 10Z" fill={clothColor}/>
            }
        </Svg>        
    )
}