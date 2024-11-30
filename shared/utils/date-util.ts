
export function formattedDate(startDate?: string, endDate?: string) {
    if (!startDate || !endDate) return ""
    return "วันที่ " + getDate(startDate) + " ถึง " + getDate(endDate)
}

export function getDate(date: string) {
    return new Date(date).toLocaleDateString("th-TH")
}
export function getDateString(date: Date) {
    return date.toISOString().split('T')[0];
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