
import dayjs from "dayjs"
export function formattedDate(startDate?: string, endDate?: string) {
    if (!startDate || !endDate) return ""
    return "วันที่ " + getDate(startDate) + " ถึง " + getDate(endDate)
}

export function removeHours(date: Date) {
    // return date.setHours(0,0,0,0)
    return dayjs(date).startOf("day").toDate()
}

export function getTimeMinuteSecond(time: number) { // Ex. 120 => 2:00
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function getDate(date: string) {
    // return new Date(date).toLocaleString([], { timeZone: "UTC"}).split(" ")[0]
    return dayjs(date).format("DD/MM/YYYY")
}
export function getDateISOString(date: Date) {
    // return date.toISOString()
    return dayjs(date).toISOString()
}

export function getDateTime(date: string) {
    // return new Date(date).toLocaleDateString("th-TH", {
    //     year: 'numeric',
    //     month: 'numeric',
    //     day: 'numeric',
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     second: 'numeric'
    //   })
    return dayjs(date).locale("th").format()
}