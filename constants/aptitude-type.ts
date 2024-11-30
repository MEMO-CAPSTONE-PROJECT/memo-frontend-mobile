import { AptitudeColor } from "@/constants/aptitude-color";

export const AptitudeType: { [key: string]: keyof typeof AptitudeColor } = {
    "จิตอาสา": "blue",
    "ความกล้าแสดงออก": "purple",
    "ความแข่งขัน": "light-purple",
    "ความมีระเบียบวินัย": "red",
    "ความรับผิดชอบ": "orange",  
    "ความเป็นผู้นำ": "yellow"
}