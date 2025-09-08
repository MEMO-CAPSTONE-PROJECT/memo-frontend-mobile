import { AptitudeColor } from "@/constants/aptitude-color"
import { Point } from "@/shared/types/achievement-type"

export const getAptitudeColor = (color: string) => {
    const apitude = color in AptitudeColor ? AptitudeColor[color as keyof typeof AptitudeColor] : undefined
    return apitude
}

export const formattedReward = (points?: Point[]) => {
    return points?.map(({ normal, excellent, details }, index) => {
        if (!details?.[0]?.type) return "ไม่มีรางวัล"
        return `${details[0]?.type} ${normal} และ ${excellent} คะแนน`
    }).join(", ") ?? ""
}

export const formattedPeople = (min?: number, max?: number) => {
    if (min === undefined || max === undefined) return ""
    return `จำนวนผู้สมัคร ${min} จาก ${max}`
}

export const formattedPointColor = (points?: Point[]) => {
    return points?.map((point) => {
        const detail = point.details?.[0]
        const color = detail?.color in AptitudeColor ? AptitudeColor[detail.color as keyof typeof AptitudeColor] : undefined
        return {
            id: detail?.type,
            borderColor: color?.color,
            backgroundColor: color?.light,
            textColor: color?.color
        }
    }) ?? []
}

export const formattedTotalScore = (scores: { type: string, score: number }[]) => {
    return scores?.map((score) => {
        return `${score.type} ${score.score}`
    }).join("\n") 
}

export const formattedPointScore = (points?: Point[], excellent = false) => {
    return points?.map((point) => {
        const detail = point.details?.[0]
        return `${detail.type} ${excellent ? point.excellent : point.normal} คะแนน`
    }).join("\n") ?? []
}