
export const mockUseTeacherAchievements = {
    data: {
        "achievementTeacher": [
            {
                "id": "1",
                "name": "แข่งเพชรยอดมงกุฎ",
                "src": "path/to/image",
                "people": {
                    "current": 1,
                    "max": 10
                },
                "sections": {
                    "startDate": "2024-09-01T12:00:00Z",
                    "endDate": "2024-09-02T23:59:59.999Z",
                    "organizer": "เรนู ทำงานหนัก"
                },
                "points": [
                    {
                        "id": "volunteer",
                        "excellent": 10,
                        "normal": 5,
                        "details": [
                            {
                                "id": "volunteer",
                                "type": "จิตอาสา",
                                "color": "blue"
                            }
                        ]
                    },
                    {
                        "id": "self-confident",
                        "excellent": 7,
                        "normal": 3,
                        "details": [
                            {
                                "id": "self-confident",
                                "type": "ความกล้าแสดงออก",
                                "color": "purple"
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

export const mockUseTeacherAchievementById = {
    "data": {
        "achievementTeacher": [
            {
                "id": "1",
                "name": "แข่งเพชรยอดมงกุฎ",
                "src": "path/to/image",
                "people": {
                    "current": 1,
                    "max": 10
                },
                "sections": {
                    "startDate": "2024-09-01T12:00:00Z",
                    "endDate": "2024-09-02T23:59:59.999Z",
                    "organizer": "เรนู ทำงานหนัก"
                },
                "points": [
                    {
                        "id": "volunteer",
                        "excellent": 10,
                        "normal": 5,
                        "details": [
                            {
                                "id": "volunteer",
                                "type": "จิตอาสา",
                                "color": "blue"
                            }
                        ]
                    },
                    {
                        "id": "self-confident",
                        "excellent": 7,
                        "normal": 3,
                        "details": [
                            {
                                "id": "self-confident",
                                "type": "ความกล้าแสดงออก",
                                "color": "purple"
                            }
                        ]
                    }
                ],
                "description": "รับตัวแทน แข่งวิทย์ 3 คน  แข่ง ณ โรงยิมของโรงเรียน\nสิ่งของที่ต้องเตรียม\n- ผ้ากันเปื้อน\n- ยาสีฟัน"
            }
        ]
    }
}