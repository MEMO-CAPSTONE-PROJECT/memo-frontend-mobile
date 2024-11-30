import { Color } from "@/constants/theme/color";
import { Clock, Crown, Heart, Icon, ListChecks, Star, Trophy } from "phosphor-react-native";


export const AptitudeColor: { [key:string]: { icon: Icon, light: string, color: string } } = {
    blue: {
        icon: Heart,
        color: Color["system-blue"],
        light: Color["system-light-blue"]
    },
    purple: {
        icon: Star,
        color: Color["primary-2"],
        light: Color["system-light-purple"]
    },
    "light-purple": {
        icon: Trophy,
        color: Color["system-light-purple"],
        light: Color["system-light-purple"]
    },
    red: {
        icon: Clock,
        color: Color["system-error-2"],
        light: Color["system-error-light"]
    },
    orange: {
        icon: ListChecks,
        color: Color["secondary-2"],
        light: Color["system-light-orange"]
    },
    yellow: {
        icon: Crown,
        color: Color["secondary-3"],
        light: Color["system-light-orange"]
    }
}