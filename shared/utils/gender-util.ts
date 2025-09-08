
export const isMan = (gender: string) => {
    switch (gender) {
        case "female":
        case "woman":
        case "girl":
        case "หญิง":
            return false
        case "male":
        case "man":
        case "boy":
        case "ชาย":
            return true
        default:
            return true
    }
}