
export const BorderWidth = {
    "none": "0px",
    "2xsm": "1px",
    "xsm": "2px",
    "sm": "3px",
    "md": "4px",
    "lg": "5px",
    "xl": "15px",
    "2xl": "30px",
}

export const getMemoBorderWidth = (size: keyof typeof BorderWidth) => {
    return Number(BorderWidth[size].replace("px", ""))
}