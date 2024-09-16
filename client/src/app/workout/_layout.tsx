import { StyleSheet, Text } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { Stack } from "expo-router";
import { BackButton } from "@/src/components/navigation/BackButton";

export default function AddLayout() {
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: Colors.dark.background } }}>
            <Stack.Screen
                name="AddWorkout"
                options={({ navigation }) => ({
                    headerShown: true,
                    headerStyle: { backgroundColor: Colors.dark.secondaryBackground },
                    headerTitle: "Manage Workouts",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        color: Colors.dark.text,
                    },
                    headerLeft: () => <BackButton navigation={navigation} />,
                })}
            />
            <Stack.Screen
                name="AddExercise"
                options={({ navigation }) => ({
                    headerShown: true,
                    headerStyle: { backgroundColor: Colors.dark.secondaryBackground },
                    headerTitle: "Manage Exercises",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        color: Colors.dark.text,
                    },
                    headerLeft: () => <BackButton navigation={navigation} />,
                })}
            />
            <Stack.Screen
                name="EditExercise"
                options={({ navigation }) => ({
                    headerShown: true,
                    headerStyle: { backgroundColor: Colors.dark.secondaryBackground },
                    headerTitle: "Edit Exercise",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        color: Colors.dark.text,
                    },
                    headerLeft: () => <BackButton navigation={navigation} />,
                })}
            />
            <Stack.Screen
                name="EditWorkout"
                options={({ navigation }) => ({
                    headerShown: true,
                    headerStyle: { backgroundColor: Colors.dark.secondaryBackground },
                    headerTitle: "Edit Workout",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        color: Colors.dark.text,
                    },
                    headerLeft: () => <BackButton navigation={navigation} />,
                })}
            />
        </Stack>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: Colors.dark.secondaryBackground,
        padding: 5,
    },
    text: {
        fontSize: 17,
        fontWeight: "normal",
        color: Colors.dark.textTertiary,
        marginVertical: 5,
    },
});
