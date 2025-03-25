import CloudSvg from "@/components/ui/icons/milestone/cloud/cloud-svg"
import BackgroundMountain from "@/components/ui/icons/natural/background-mountain"
import Flag from "@/components/ui/icons/natural/flag"
import { Color } from "@/constants/theme/color"
import { FontFamily, getMemoFontSize } from "@/constants/theme/font"
import { Fragment, useMemo } from "react"
import { Dimensions, Text, View } from "react-native"
import Svg, { Path, Text as SvgText } from "react-native-svg"

interface MountainChartProps {
    width?: number
    height?: number
    size?: number
    peakScale?: number
    colors: string[]
    data: ChartData[]
    children?: React.ReactNode
}

interface ChartData {
    label: string,
    value: number
}

interface MountainsProps {
    value: number
    maxValue: number
    x: number
    y: number
    color: string
    mountainPath: string
    snowPath: string
}

function Mountains({
    value, maxValue,
    x, y,
    color,
    mountainPath, snowPath
}: Readonly<MountainsProps>) {
    return (
        <Fragment>
            <Path d={mountainPath} fill={color} />
            {/* Top of mountain is flag and snow */}
            {value === maxValue && (
                <Fragment>
                    <Flag x={x} y={y} />
                    <Path d={snowPath} fill={Color["system-white"]} />
                </Fragment>
            )}
        </Fragment>
    )
}

export default function MountainChart({
    width = Dimensions.get("window").width,
    height = 150,
    size = 50,
    peakScale = 1.4,
    data,
    colors,
    children,
}: Readonly<MountainChartProps>) {
    const mountainSize = size / data.length * 4.5
    const maxValue = Math.max(1, ...data.map(d => d.value))

    const generatePath = (peak: { padding: number, x: number, y: number }) => {
        const baseLeft = { x: peak.x - mountainSize - (peak.padding / maxValue * mountainSize), y: height }
        const baseRight = { x: peak.x + mountainSize + (peak.padding / maxValue * mountainSize), y: height }
        const mountainPath = `M${baseLeft.x},${baseLeft.y} ` +
            `Q${peak.x - mountainSize / 1.5},${peak.y} ${peak.x},${peak.y} ` +
            `Q${peak.x + mountainSize / 1.5},${peak.y} ${baseRight.x},${baseRight.y} ` +
            `L${baseLeft.x},${baseLeft.y} Z`

        // Snow path with rounded, wavy bottom edge
        const snowHeight = (height - peak.y) * 0.35 // Cover 35% of mountain height
        const snowLeft = { x: peak.x - mountainSize * 1.2, y: peak.y + snowHeight, }
        const snowRight = { x: peak.x + mountainSize * 1.2, y: peak.y + snowHeight, }
        // Snow wave
        const snowWave1 = { x: peak.x - mountainSize, y: peak.y + snowHeight + mountainSize * 0.2, }
        const snowWave2 = { x: peak.x - mountainSize * 0.3, y: peak.y + snowHeight - mountainSize * 0.1, }
        const snowWave3 = { x: peak.x + mountainSize * 0.1, y: peak.y + snowHeight + mountainSize * 0.5, }
        const snowWave4 = { x: peak.x + mountainSize * 0.4, y: peak.y + snowHeight - mountainSize * 0.1, }
        // Snow path
        const snowPath =
            `M${snowLeft.x},${snowLeft.y} ` +
            `Q${snowLeft.x},${snowWave1.y} ${snowWave1.x},${snowWave1.y} ` +
            `Q${snowWave1.x + mountainSize * 0.5},${snowWave2.y + mountainSize * 0.5} ${snowWave2.x},${snowWave2.y} ` +
            `Q${snowWave3.x + mountainSize * 0.2},${snowWave4.y + mountainSize * 0.2} ${snowWave4.x},${snowWave4.y} ` +
            `Q${snowRight.x + mountainSize * 0.1},${snowRight.y + mountainSize * 0.5} ${snowRight.x},${snowRight.y} ` +
            `Q${peak.x + mountainSize * 0.8},${peak.y - mountainSize * 0.3} ${peak.x},${peak.y} ` +
            `Q${peak.x - mountainSize * 0.4},${peak.y - mountainSize * 0.4} ${snowLeft.x},${snowLeft.y} ` +
            `Z`

        return { mountainPath, snowPath }
    }

    const mountainOrder = data
        .map((entry, index) => ({ ...entry, originalIndex: index }))
        .sort((a, b) => b.value - a.value) // Lowest value last (on top (*z-index in svg))

    // Calculate the total width of the mountain group
    const chartWidth = useMemo(() => {
        const spacing = width / (data.length + 1) // Space between mountain peaks
        const totalMountainSpan = (data.length - 1) * spacing // Total span of peaks
        const maxMountainWidth = 2 * (mountainSize + mountainSize) // Max width for value 30
        return Math.min(width * 0.8, totalMountainSpan + maxMountainWidth) // Include widest mountain
    }, [mountainSize, width, data])

    const xOffset = useMemo(
        () => (width - chartWidth) / 2,
        [width, chartWidth]
    ) // Center the group

    return (
        <View className="justify-center items-center overflow-hidden">
            {/* SVG with blue background */}
            <View className="flex flex-col bg-system-light-blue" style={{ width: width }}>
                {/* Mountain background */}
                <View className="absolute bottom-0">
                    <BackgroundMountain />
                </View>
                {/* Clouds */}
                <View>
                    <CloudSvg size={60} className="absolute top-4 left-0" />
                    <CloudSvg size={60} className="absolute top-20 right-24" />
                    <CloudSvg size={60} className="absolute top-2 right-0" />
                </View>
                {children}
                {/* Mountain chart */}
                <Svg width={width} height={height}>
                    {mountainOrder.map((entry) => {
                        const x = xOffset + (entry.originalIndex / data.length) * width // Centered x
                        const y = height - (entry.value / maxValue) * (height / peakScale)
                        const { mountainPath, snowPath } = generatePath({ padding: entry.value, x, y })

                        return (
                            <Fragment key={`label-${entry.originalIndex}`}>
                                {entry.value > 0 && <Mountains 
                                    value={entry.value} 
                                    maxValue={maxValue} 
                                    x={x} 
                                    y={y} 
                                    color={colors[entry.originalIndex]} 
                                    mountainPath={mountainPath} 
                                    snowPath={snowPath} 
                                />}
                                {/* Value label */}
                                <SvgText
                                    x={x}
                                    y={entry.value >= maxValue ? y + 15 : y - 5}
                                    fontSize={getMemoFontSize("body")}
                                    fontFamily={FontFamily["kanit-bold"]}
                                    textAnchor="middle"
                                    fill={entry.value >= maxValue ? Color["system-blue"] : Color["title-1"]}
                                >
                                    {entry.value}
                                </SvgText>
                            </Fragment>
                        )
                    })}
                </Svg>
            </View>
            {/* X-axis Labels outside SVG */}
            <View className="relative h-[25] w-full bg-grass-green">
                {data.map((entry, index) => {
                    const x = xOffset + (index / data.length) * width // Same x as mountains
                    return (
                        <Text
                            key={`label-${index}`}
                            className={`absolute font-kanit-bold text-caption-1 ${entry.value >= maxValue ? "text-system-blue" : "text-title-1"}`}
                            style={{ left: x - 5 }}
                        >
                            {entry.label}
                        </Text>
                    )
                })}
            </View>
        </View>
    )
}