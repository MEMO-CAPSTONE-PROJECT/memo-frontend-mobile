import { Color } from "@/constants/theme/color";
import { Tabs } from "expo-router";
import { cssInterop } from "nativewind";
import { House, ListChecks, Trophy, User } from "phosphor-react-native";
import { ComponentProps } from "react";
import { View, ViewStyle } from "react-native";

export default function ParentTabsLayout() {
    const tabs = [
        { route: "index", title: "หน้าหลัก", Icon: House },
        { route: "goal", title: "เป้าหมาย", Icon: ListChecks },
        { route: "achievement", title: "รายการความสำเร็จ", Icon: Trophy },
        { route: "profile", title: "โปรไฟล์", Icon: User },
    ]
    return (
        <TabsInterop 
            tabBarClassName="border-t-xsm border-t-primary-2"
            titleClassName="font-kanit-bold text-secondary-3"
        >
            {tabs.map(({ route, title, Icon }) => (
                <Tabs.Screen
                    key={route}
                    name={route}
                    options={{ 
                        title,
                        tabBarShowLabel: false,
                        tabBarIcon: ({ focused }) => (
                            <View className={`h-full px-2 justify-center`}>
                                <Icon 
                                    weight={focused ? "fill" : "bold"} 
                                    color={focused ? Color["primary-2"] : Color["body-1"]} 
                                />
                            </View>
                        )
                    }}
                />
            ))}
        </TabsInterop>
    )
}

interface TabsProps extends Omit<ComponentProps<typeof Tabs>, "screenOptions"> {
    headerStyle?: ViewStyle
    tabBarStyle?: ViewStyle
    headerTitleStyle?: ViewStyle
}

const TabsInterop = cssInterop(
    ({ headerStyle, headerTitleStyle, tabBarStyle, ...props }: TabsProps) => (
        <Tabs screenOptions={{ headerTransparent: true, headerStyle: headerStyle, headerTitleStyle, tabBarStyle }} {...props} />
    ),
    {
        headerClassName: "headerStyle",
        titleClassName: "headerTitleStyle",
        tabBarClassName: "tabBarStyle"
    }
)