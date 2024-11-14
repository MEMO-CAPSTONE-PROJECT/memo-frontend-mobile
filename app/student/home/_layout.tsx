import { Color } from "@/constants/theme/color";
import { Tabs } from "expo-router";
import { cssInterop } from "nativewind";
import { House, ListChecks, Trophy, User } from "phosphor-react-native";
import { ComponentProps } from "react";
import { View, ViewStyle } from "react-native";

export default function StudentRootLayout() {
    return (
        <CustomTabs
            initialRouteName="student/home"
            className="shadow-md"
            titleClassName="font-kanit-bold text-secondary-3"
            tabBarClassName="bg-system-white border-t-sm border-t-primary-2"
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "หน้าหลัก",
                    headerTransparent: true,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        <View className={`h-full px-2 justify-center`}>
                            <House weight={focused ? "fill" : "bold"} color={focused ? Color["primary-2"] : Color["body-1"]} />
                        </View>
                }}
            />
            <Tabs.Screen
                name="goal/index"
                options={{
                    title: "เป้าหมาย",
                    headerTransparent: true,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        <View className={`h-full px-2 justify-center`}>
                            <ListChecks weight={focused ? "fill" : "bold"} color={focused ? Color["primary-2"] : Color["body-1"]} />
                        </View>
                }}
            />         
            <Tabs.Screen
                name="achievement/index"
                options={{
                    title: "รายการ",
                    headerTransparent: true,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        <View className={`h-full px-2 justify-center`}>
                            <Trophy weight={focused ? "fill" : "bold"} color={focused ? Color["primary-2"] : Color["body-1"]} />
                        </View>
                }}
            />
            <Tabs.Screen
                name="profile/index"
                options={{
                    title: "โปรไฟล์",
                    headerTransparent: true,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        <View className={`h-full px-2 justify-center`}>
                            <User weight={focused ? "fill" : "bold"} color={focused ? Color["primary-2"] : Color["body-1"]} />
                        </View>
                }}
            />
        </CustomTabs>
    )
}

interface TabsProps extends Omit<ComponentProps<typeof Tabs>, "screenOptions"> {
    headerStyle?: ViewStyle
    tabBarStyle?: ViewStyle
    headerTitleStyle?: ViewStyle
}

const CustomTabs = cssInterop(
    ({ headerStyle, headerTitleStyle, tabBarStyle, ...props }: TabsProps) => (
        <Tabs screenOptions={{ headerStyle: headerStyle, headerTitleStyle, tabBarStyle }} {...props} />
    ),
    {
        className: "headerStyle",
        titleClassName: "headerTitleStyle",
        tabBarClassName: "tabBarStyle"
    }
)