// LineChart.tsx
import { Color } from '@/constants/theme/color'
import { FontFamily, getMemoFontSize } from '@/constants/theme/font'
import React, { Fragment } from 'react'
import Svg, { Circle, G, Line, Path, Text as SvgText } from 'react-native-svg'

interface ChartData {
    value: number[]
    lineColor?: string
    backgroundColor?: string
    dotColor?: string
    opacity?: number
    strokeWidth?: number
}

interface LineChartProps {
    datas: ChartData[]
    labels: string[]
}

export default function MemoLineChart({ datas, labels }: Readonly<LineChartProps>) {
    if (datas.length === 0) return null
    if (!datas.every(data => data.value.length === labels.length)) return null
    const chartHeight = 250
    const chartWidth = 350
    const padding = 40 // Increased padding to accommodate axis labels
    const yPadding = 20 // Padding for y-axis label

    // Calculate scale for y-axis
    const maxValue = Math.max(1, ...datas.map(d => Math.max(...d.value)))
    const yScale = (chartHeight - padding * 2) / maxValue
    const xScale = (chartWidth - padding * 2) / (labels.length - 1)

    const getPoint = (data: number[], index: number) => ({
        x: padding + xScale * index,
        y: chartHeight - padding - data[index] * yScale,
    })

    const drawBezierPath = (data: number[]) => {
        let path = ''
        for (let i = 0; i < data.length; i++) {
            const point = getPoint(data, i)
            if (i === 0) {
                path += `M${point.x},${point.y} `
            } else {
                const p0 = i - 2 >= 0 ? getPoint(data, i - 2) : getPoint(data, i - 1) // Previous-previous
                const p1 = getPoint(data, i - 1) // Previous
                const p2 = point // Current
                const p3 = i + 1 < data.length ? getPoint(data, i + 1) : point // Next

                // Catmull-Rom to Bezier control points
                const tension = 0 // Adjust for smoothness (0.3 to 0.7)
                const cp1x = p1.x + (p2.x - p0.x) * tension / 6
                const cp1y = p1.y + (p2.y - p0.y) * tension / 6
                const cp2x = p2.x - (p3.x - p1.x) * tension / 6
                const cp2y = p2.y - (p3.y - p1.y) * tension / 6

                path += `C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y} `
            }
        }
        return path
    }


    return (
        <Svg height={chartHeight} width={chartWidth}>
            {/* Grid Lines */}
            <GridLines
                chartHeight={chartHeight}
                chartWidth={chartWidth}
                padding={padding}
            />
            {/* Loop through each week's data and create a line for each */}
            {datas.map((data, index) => {
                const backgroundColor = data.backgroundColor ?? Color["system-blue"]
                const lineColor = data.lineColor ?? Color["system-blue"] // Assign color for each week
                const dotColor = data.dotColor ?? Color["title-1"]
                const strokeWidth = data.strokeWidth ?? 2
                const opacity = data.opacity ?? 1

                const bezierPath = drawBezierPath(data.value)
                const fillPath = bezierPath + `L${chartWidth - padding},${chartHeight - padding} L${padding},${chartHeight - padding} Z`

                return (
                    <G key={`week-${index}`} fill="none">
                        {/* Fill the area under the Bezier curve with background color */}
                        <Path
                            opacity={opacity}
                            d={fillPath}
                            fill={backgroundColor} // Background fill under the curve
                        />

                        {/* Bezier Curve */}
                        <Path
                            d={bezierPath}
                            fill="none"
                            stroke={lineColor}
                            strokeWidth={strokeWidth}
                        />
                        {/* Circles with text above each point */}
                        {data.value.map((value, index) => {
                            const point = getPoint(data.value, index)
                            return (
                                <Fragment key={`circle-${index}-${index}`}>
                                    <Circle
                                        cx={point.x}
                                        cy={point.y}
                                        r={4}
                                        fill={dotColor}
                                    />
                                    <SvgText
                                        x={point.x}
                                        y={point.y - 10} // Position the text above the circle
                                        fontFamily={FontFamily["kanit-medium"]}
                                        fontSize={getMemoFontSize("caption-2")}
                                        fill={dotColor}
                                        textAnchor="middle"
                                    >
                                        {value}
                                    </SvgText>
                                </Fragment>
                            )
                        })}
                    </G>
                )
            })}
            {/* X-Axis Labels */}
            <XAxisLabels
                labels={labels}
                chartHeight={chartHeight}
                padding={padding}
                xScale={xScale}
            />

            {/* Y-Axis Labels */}
            <YAxisLabels
                chartHeight={chartHeight}
                padding={padding}
                maxValue={maxValue}
                yPadding={yPadding}
            />
        </Svg>
    )
}

interface GridLinesProps {
    chartHeight: number
    chartWidth: number
    padding: number
}

function GridLines({ chartHeight, chartWidth, padding }: Readonly<GridLinesProps>) {
    return (
        <G>
            {Array.from({ length: 5 }).map((_, index) => {
                const yPos = padding + (index * (chartHeight - padding * 2)) / 4
                return (
                    <Line
                        key={`grid-${index}`}
                        x1={padding}
                        y1={yPos}
                        x2={chartWidth - padding}
                        y2={yPos}
                        stroke={Color["title-1"]}
                        strokeWidth="1"
                        strokeDasharray="4,4"
                    />
                )
            })}
        </G>
    )
}

interface XAxisLabelsProps {
    labels: string[]
    chartHeight: number
    padding: number
    xScale: number
}

function XAxisLabels({ labels, chartHeight, padding, xScale }: Readonly<XAxisLabelsProps>) {
    return (
        <G>
            {labels.map((label, index) => {
                const xPos = padding + xScale * index
                return (
                    <SvgText
                        key={`label-${index}`}
                        fontFamily={FontFamily["kanit-medium"]}
                        x={xPos}
                        y={chartHeight - padding + 20} // Place labels below the chart
                        fontSize={getMemoFontSize("caption-1")}
                        fill={Color["title-1"]}
                        textAnchor="middle"
                    >
                        {label}
                    </SvgText>
                )
            })}
        </G>
    )
}

interface YAxisLabelsProps {
    chartHeight: number
    padding: number
    maxValue: number
    yPadding: number
}

function YAxisLabels({ chartHeight, padding, maxValue, yPadding }: Readonly<YAxisLabelsProps>) {
    return (
        <G>
            {Array.from({ length: 5 }).map((_, index) => {
                const yPos = padding + (index * (chartHeight - padding * 2)) / 4
                const labelValue = Math.round((maxValue * (4 - index)) / 4) // Calculate the label value
                return (
                    <SvgText
                        key={`yLabel-${index}`}
                        fontFamily={FontFamily["kanit-medium"]}
                        x={yPadding}
                        y={yPos + 5} // Adjust for label positioning
                        fontSize={getMemoFontSize("caption-1")}
                        fill={Color["title-1"]}
                        textAnchor="middle"
                    >
                        {labelValue}
                    </SvgText>
                )
            })}
        </G>
    )
}