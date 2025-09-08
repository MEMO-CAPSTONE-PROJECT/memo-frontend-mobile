import { AptitudeColor } from "@/constants/aptitude-color";

type AptitudeColorKeys = keyof typeof AptitudeColor

export const AptitudeType: Record<string, AptitudeColorKeys> = {
    "จิตอาสา": "blue",
    "ความกล้าแสดงออก": "purple",
    "ความแข่งขัน": "light_purple",
    "ความมีระเบียบวินัย": "red",
    "ความรับผิดชอบ": "orange",  
    "ความเป็นผู้นำ": "yellow"
}