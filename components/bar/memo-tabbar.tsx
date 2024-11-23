import { Color } from "@/constants/theme/color"
import { Tabs } from "expo-router"
import { cssInterop } from "nativewind"
import { Icon, IconProps } from "phosphor-react-native"
import { ComponentProps, useCallback } from "react"
import { View, ViewStyle } from "react-native"

interface MemoTabBarProps {
    tabs: TabBarItem[]
}

interface TabBarItem {
    route: string
    title: string
    icon: Icon
}

interface TabBarIconProps {
    focused: boolean
    icon: React.ComponentType<IconProps>
}

export default function MemoTabBar({ tabs }: Readonly<MemoTabBarProps>) {
    const TabBarIcon: React.FC<TabBarIconProps> = useCallback(({ focused, icon: Icon }) => (
        <View className="h-full px-2 justify-center">
            <Icon
                size={28}
                weight={focused ? "fill" : "regular"}
                color={focused ? Color["primary-2"] : Color["body-1"]}
            />
        </View>
    ), [])

    return (
        <TabInterop tabBarClassName="bg-system-white border-t-xsm border-t-primary-2">
            {tabs.map(({ route, title, icon }) => (
                <Tabs.Screen
                    key={route}
                    name={route}
                    options={{
                        title,
                        tabBarShowLabel: false,
                        tabBarIcon: (props) => TabBarIcon({ ...props, icon })
                    }}
                />
            ))}
        </TabInterop>
    )
}

interface TabsProps extends ComponentProps<typeof Tabs> {
    tabBarStyle?: ViewStyle
}

const TabInterop = cssInterop(
    ({ tabBarStyle, screenOptions, ...props }: TabsProps) => (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: tabBarStyle,
            ...screenOptions
        }} {...props} />
    ),
    {
        tabBarClassName: "tabBarStyle",
    }
)