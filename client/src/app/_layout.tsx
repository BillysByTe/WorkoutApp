import { Stack } from "expo-router";
import { WorkoutProviders } from "../components/providers/Provider";

export default function RootLayout() {
    return (
        <WorkoutProviders>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </WorkoutProviders>
    );
}
