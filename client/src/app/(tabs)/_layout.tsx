import { Tabs } from "expo-router";
import { TabBarIcon } from "@/src/components/navigation/TabBarIcon";
import { Colors } from "@/src/constants/Colors";

export default function TabLayout() {
    return (
        <Tabs
            sceneContainerStyle={{ backgroundColor: Colors.dark.background }}
            screenOptions={{
                tabBarStyle: { backgroundColor: Colors.dark.secondaryBackground, borderTopWidth: 0 },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? "home" : "home-outline"} color={color} />
                    ),
                }}
            ></Tabs.Screen>
            <Tabs.Screen
                name="train"
                options={{
                    title: "Train",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? "football" : "football-outline"} color={color} />
                    ),
                }}
            ></Tabs.Screen>
            <Tabs.Screen
                name="workouts"
                options={{
                    title: "Workouts",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? "barbell" : "barbell-outline"} color={color} />
                    ),
                }}
            ></Tabs.Screen>
        </Tabs>
    );
}
