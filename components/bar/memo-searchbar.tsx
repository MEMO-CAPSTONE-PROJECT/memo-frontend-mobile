import { Color } from "@/constants/theme/color";
import { MagnifyingGlass } from "phosphor-react-native";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

interface MemoSearchBarProps {
    placeholder: string,
    onSearch?: (value: string) => void
}

export default function MemoSearchBar({ placeholder, onSearch }: Readonly<MemoSearchBarProps>) {
    const [focus, setFocus] = useState(false)
    const borderColor = focus ? "border-title-1" : "border-system-light-gray"
    return (
        <Pressable className={`flex-1 flex-row justify-between items-center h-4xl rounded-sm bg-system-light-gray border-xsm ${borderColor}`}>
            <TextInput 
                placeholder={placeholder}
                placeholderTextColor={Color["body-2"]}
                className={`font-kanit-medium text-title-1 pl-3 flex-1 ease-in-out transition`}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChangeText={onSearch}
            />  
           <View className="p-3 pl-1"><MagnifyingGlass weight="bold" color={Color["title-1"]}/></View>  
        </Pressable>
    )
}