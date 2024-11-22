import { Color } from "@/constants/theme/color";
import { MagnifyingGlass } from "phosphor-react-native";
import { Pressable, TextInput, View } from "react-native";

interface MemoSearchBarProps {
    placeholder: string,
    onPress?: () => void
}

export default function MemoSearchBar({ placeholder, onPress }: Readonly<MemoSearchBarProps>) {
    return (
        <Pressable onPress={onPress} className="w-full flex-row justify-between items-center h-4xl rounded-sm bg-system-light-gray">
            <TextInput 
                placeholder={placeholder}
                placeholderTextColor={Color["body-2"]}
                className={`font-kanit-medium text-title-1 pl-3 flex-1 ease-in-out transition`}
            />  
           <View className="p-3 pl-1"><MagnifyingGlass weight="bold" color={Color["title-1"]}/></View>  
        </Pressable>
    )
}