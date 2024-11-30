import { AptitudeColor } from "@/constants/aptitude-color"

export const getAptitudeColor = (color: string) => {
    const apitude = color in AptitudeColor ? AptitudeColor[color] : undefined
    return apitude
}