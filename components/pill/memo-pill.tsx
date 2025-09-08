import { Color } from "@/constants/theme/color";
import React from 'react';
import { Text, View } from "react-native";

interface MemoPillProps {
    name?: string  
    borderColor?: string
    textColor?: string
    backgroundColor?: string
}

export default function MemoPill({ name, borderColor = Color["primary-2"], backgroundColor = Color["system-light-purple"], textColor = Color["primary-2"] }: Readonly<MemoPillProps>) {
    if (!name) return <></>
    return (
        <View 
            className={`border-2xsm rounded-xsm w-fit justify-center items-center`}
            style={{ borderColor, backgroundColor, }}
        >
            <Text 
                className={`px-md font-kanit-medium`} 
                style={{ color: textColor }}
            >
                {name}
            </Text>
        </View>
    )
}