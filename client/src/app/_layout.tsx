import { Stack } from "expo-router";
import { WorkoutProviders } from "../components/providers/Provider";
import { Colors } from "../constants/Colors";

export default function RootLayout() {
    return (
        <WorkoutProviders>
            <Stack screenOptions={{ contentStyle: { backgroundColor: Colors.dark.background } }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="workout"
                    options={({ route }) => {
                        const isAddPage = route.name.includes("workout");
                        return {
                            headerShown: !isAddPage,
                            headerStyle: { backgroundColor: Colors.dark.secondaryBackground },
                            headerTitle: "Manage Workouts",
                            headerTitleAlign: "center",
                            headerTitleStyle: { color: Colors.dark.text },
                        };
                    }}
                />
            </Stack>
        </WorkoutProviders>
    );
}
