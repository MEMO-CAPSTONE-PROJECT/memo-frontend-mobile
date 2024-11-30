
export const isMan = (gender: string) => {
    switch (gender) {
        case "woman":
        case "girl":
        case "หญิง":
            return false
        case "man":
        case "boy":
        case "ชาย":
            return true
        default:
            return true
    }
}