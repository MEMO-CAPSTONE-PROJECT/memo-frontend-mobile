import { Color } from "@/constants/theme/color"

export const InputStates = {
    default: { borderColor: "border-system-light-gray", bgColor: "bg-system-light-gray", placeholderColor: Color["body-2"], textColor: "text-title-1" },
    error: { borderColor: "border-system-error", bgColor: "bg-system-error-light", placeholderColor: Color["system-error"], textColor: "text-system-error" },
    success: { borderColor: "border-system-success", bgColor: "bg-system-success-light", placeholderColor: Color["system-success"], textColor: "text-system-success" },
    focus: { borderColor: "border-title-1", bgColor: "bg-system-light-gray", placeholderColor: Color["body-2"], textColor: "text-title-1" },
    disabled: { borderColor: "border-body-2", bgColor: "bg-system-gray", placeholderColor: Color["body-2"], textColor: "text-body-2" },
}

export const InputStateColors = {
    default: { borderColor: Color["system-light-gray"], bgColor: Color["system-light-gray"], placeholderColor: Color["body-2"], textColor: Color["title-1"] },
    error: { borderColor: Color["system-error"], bgColor: Color["system-error-light"], placeholderColor: Color["system-error"], textColor: Color["system-error"] },
    success: { borderColor: Color["system-success"], bgColor: Color["system-success-light"], placeholderColor: Color["system-success"], textColor: Color["system-success"] },
    focus: { borderColor: Color["title-1"], bgColor: Color["system-light-gray"], placeholderColor: Color["body-2"], textColor: Color["title-1"] },
    disabled: { borderColor: Color["body-2"], bgColor: Color["system-gray"], placeholderColor: Color["body-2"], textColor: Color["body-2"] },
}