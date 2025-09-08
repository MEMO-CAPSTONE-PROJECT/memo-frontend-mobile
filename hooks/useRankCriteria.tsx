import AptitudeTierDiamondSvg from "@/components/ui/icons/aptitude-tier/diamond-svg";
import AptitudeTierEmeraldSvg from "@/components/ui/icons/aptitude-tier/emerald-svg";
import AptitudeTierGoldSvg from "@/components/ui/icons/aptitude-tier/gold-svg";
import AptitudeTierSilverSvg from "@/components/ui/icons/aptitude-tier/silver-svg";
import AptitudeTierWoodSvg from "@/components/ui/icons/aptitude-tier/wood-svg";
import { AptitudeType } from "@/constants/aptitude-type";
import { Color } from "@/constants/theme/color";
import { StudentPoint } from "@/shared/types/criteria-type";
import { getAptitudeColor } from "@/shared/utils/aptitude-util";
import { useEffect, useMemo, useState } from "react";

const TIER_ICON_SIZE = 70
const RankCriteria = [
    {
        name: "เชี่ยวชาญ",
        percent: 30,
        icon: <AptitudeTierEmeraldSvg size={TIER_ICON_SIZE} />,
    },
    {
        name: "เหนือชั้น",
        percent: 20,
        icon: <AptitudeTierDiamondSvg size={TIER_ICON_SIZE} />,
    },
    {
        name: "เก่ง",
        percent: 10,
        icon: <AptitudeTierGoldSvg size={TIER_ICON_SIZE} />,
    },
    {
        name: "ขยัน",
        percent: 5,
        icon: <AptitudeTierSilverSvg size={TIER_ICON_SIZE} />,
    },
    {
        name: "ธรรมดา",
        percent: 0,
        icon: <AptitudeTierWoodSvg size={TIER_ICON_SIZE} />,
    },
]

export function useRankCriteria(studentPoints?: StudentPoint[], isSuccess?: boolean) {
    const [totalPoints, setTotalPoints] = useState(0)
    const [points, setPoints] = useState<number[]>([])
    const [colors, setColors] = useState<string[]>([])

    const data = useMemo(() => studentPoints ?? Object.keys(AptitudeType).map((aptitude) => (
        {
            type: aptitude,
            color: AptitudeType[aptitude],
            point: 0
        }
    )), [studentPoints])

    // Calculate total points when data is available
    useEffect(() => {
        if (data && isSuccess) {
            const updatedPoints = []
            const updatedColors = []
            let updatedTotalPoints = 0

            for (const { point, color } of data) {
                const aptitude = getAptitudeColor(color)
                updatedPoints.push(point)
                updatedColors.push(aptitude?.color ?? Color["primary-2"])
                updatedTotalPoints += point
            }
            setPoints(updatedPoints)
            setColors(updatedColors)
            setTotalPoints(updatedTotalPoints)
        } else {
            // Reset states if data is not available
            setPoints([])
            setColors([])
            setTotalPoints(0)
        }
    }, [data, isSuccess])

    return { RankCriteria, totalPoints, points, colors, data }
}