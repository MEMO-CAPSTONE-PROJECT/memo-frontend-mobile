import { GetAptitudeResponse } from "@/hooks/query/useAptitudeQuery";

export const mockUseGetAptitudes: GetAptitudeResponse = {
    data: {
        "aptitudes": [
            {
                "id": "volunteer",
                "type": "จิตอาสา",
                "color": "blue"
            },
            {
                "id": "self-confident",
                "type": "ความกล้าแสดงออก",
                "color": "purple"
            },
            {
                "id": "competition",
                "type": "ความแข่งขัน",
                "color": "light_purple"
            },
            {
                "id": "discipline",
                "type": "ความมีระเบียบวินัย",
                "color": "red"
            },
            {
                "id": "responsibility",
                "type": "ความรับผิดชอบ",
                "color": "orange"
            },
            {
                "id": "leadership",
                "type": "ความเป็นผู้นำ",
                "color": "yellow"
            }
        ]
    }
}