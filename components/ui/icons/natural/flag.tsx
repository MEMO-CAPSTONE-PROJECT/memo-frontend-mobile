import { Color } from "@/constants/theme/color"
import { Fragment } from "react"
import { Circle, Path, Rect } from "react-native-svg"

interface FlagProps {
    x: number
    y: number
}

export default function Flag({ x, y }: Readonly<FlagProps>) {
      return (
        <Fragment>
          <Rect x={x - 1}  y={y - 33} width="2" height="33"  fill={Color["body-1"]} />
          {/* Flag square part */}
          <Rect x={x + 1} y={y - 32}  width="10" height="10" fill={Color["system-error-2"]} />
          {/* Flag triangle part (top) */}
          <Path
            d={`M${x + 11} ${y - 32} H${x + 16} L${x + 13.5} ${y - 29.5} L${x + 11} ${y - 27} V${y - 32} Z`}
            fill={Color["system-error-2"]}
          />
          {/* Flag triangle part (bottom) */}
          <Path
            d={`M${x + 11} ${y - 27} L${x + 13.5} ${y - 24.5} L${x + 16} ${y - 22} H${x + 11} V${y - 27} Z`}
            fill={Color["system-error-2"]}
          />
          <Circle cx={x} cy={y - 34.7} r="2.5" fill={Color["body-1"]} />
        </Fragment>
      )
}