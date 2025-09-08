import { Color } from "@/constants/theme/color";
import { Stack, UnknownOutputParams, useGlobalSearchParams } from "expo-router";
import { cssInterop } from "nativewind";
import { ArrowLeft } from "phosphor-react-native";
import React, { ComponentProps, useCallback } from "react";
import { Pressable, TextStyle } from "react-native";

interface MemoAppBarProps {
    stacks: MemoAppBarScreen[]
}

interface MemoAppBarScreen {
    route: string
    title: (params: UnknownOutputParams) => string
}

interface BackIconProps {
    onPress: () => void,
}

export default function MemoAppBar({ stacks }: Readonly<MemoAppBarProps>) {
    const params = useGlobalSearchParams()
    const BackIcon: React.FC<BackIconProps> = useCallback(({ onPress }) => (
        <Pressable onPress={onPress} className="p-2">
            <ArrowLeft color={Color["secondary-3"]} weight="bold" />
        </Pressable>
    ), [])

    return (
        <StackInterop titleClassName="font-kanit-bold text-secondary-3"> 
            {stacks.map(({ route, title }) => (
                <Stack.Screen
                    key={route}
                    name={route}
                    options={({ navigation }) => ({
                        title: title(params),
                        headerLeft: (props) => ((props.canGoBack && route !== "index") && BackIcon({ onPress: navigation.goBack })),
                    })}
                />
            ))}
        </StackInterop>
    )
}

interface StackProps extends ComponentProps<typeof Stack> {
    headerTitleStyle?: Pick<TextStyle, 'fontFamily' | 'fontSize' | 'fontWeight'> & {
        color?: string;
    }
}

const StackInterop = cssInterop(
    ({ headerTitleStyle, screenOptions, ...props }: StackProps) => (
        <Stack screenOptions={{
            headerTransparent: true,
            headerTitleStyle: headerTitleStyle,
            ...screenOptions
        }} {...props} />
    ),
    {
        titleClassName: "headerTitleStyle",
    }
)