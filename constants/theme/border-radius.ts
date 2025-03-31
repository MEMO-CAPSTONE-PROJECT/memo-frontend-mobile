
export const BorderRadius = {
    none: "0px",
    xsm: "5px",
    sm: "10px",
    md: "15px",
    lg: "30px",
    xl: "25px",
    "2xl": "30px",
    full: "100%",
    circle: "100vw",
}
export const getMemoBorderRadius = (size: keyof typeof BorderRadius) => {
    return Number(BorderRadius[size].replace("px", ""))
}