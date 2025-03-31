import { Color } from "@/constants/theme/color";
import { Clock, Crown, Heart, Icon, ListChecks, Star, Trophy } from "phosphor-react-native";

export type AptitudeColorValues = {
    icon: Icon
    color: string
    light: string
    background: string
}

export const AptitudeColor: Record<string, AptitudeColorValues> = {
    blue: {
        icon: Heart,
        color: Color["system-blue"],
        light: Color["system-light-blue"],
        background: Color["system-light-blue-2"]
    },
    purple: {
        icon: Star,
        color: Color["primary-3"],
        light: Color["system-light-purple"],
        background: Color["system-light-purple-2"]
    },
    "light_purple": {
        icon: Trophy,
        color: Color["primary-2"],
        light: Color["system-light-purple"],
        background: Color["system-light-pink"]
    },
    red: {
        icon: Clock,
        color: Color["system-error-2"],
        light: Color["system-error-light"],
        background: Color["system-light-red"]
    },
    orange: {
        icon: ListChecks,
        color: Color["secondary-2-hover"],
        light: Color["system-light-orange"],
        background: Color["system-light-orange-2"]
    },
    yellow: {
        icon: Crown,
        color: Color["secondary-2"],
        light: Color["system-light-yellow"],
        background: Color["system-light-yellow-2"]
    }
}