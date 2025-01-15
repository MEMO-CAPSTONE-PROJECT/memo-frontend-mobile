import { Color } from "@/constants/theme/color";
import { Clock, Crown, Heart, ListChecks, Star, Trophy } from "phosphor-react-native";

export const AptitudeColor = {
    blue: {
        icon: Heart,
        color: Color["system-blue"],
        light: Color["system-light-blue"]
    },
    purple: {
        icon: Star,
        color: Color["primary-3"],
        light: Color["system-light-purple"]
    },
    "light_purple": {
        icon: Trophy,
        color: Color["primary-2"],
        light: Color["system-light-purple"]
    },
    red: {
        icon: Clock,
        color: Color["system-error-2"],
        light: Color["system-error-light"]
    },
    orange: {
        icon: ListChecks,
        color: Color["secondary-2-hover"],
        light: Color["system-light-orange"]
    },
    yellow: {
        icon: Crown,
        color: Color["secondary-2"],
        light: Color["system-light-yellow"]
    }
}