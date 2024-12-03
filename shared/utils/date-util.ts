
export function formattedDate(startDate?: string, endDate?: string) {
    if (!startDate || !endDate) return ""
    return "วันที่ " + getDate(startDate) + " ถึง " + getDate(endDate)
}

export function removeHours(date: Date) {
    return date.setHours(0,0,0,0)
}

export function getDate(date: string) {
    return new Date(date).toLocaleString([], { timeZone: "UTC"}).split(" ")[0]
}
export function getDateISOString(date: Date) {
    return date.toISOString()
}

export function getDateTime(date: string) {
    return new Date(date).toLocaleDateString("th-TH", {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })
}