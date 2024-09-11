import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { Colors } from "../constants/Colors";
import * as SQLite from "expo-sqlite";
import { Exercise, Workout } from "../types/exercises.types";

export const AddWorkout = () => {
    const db = SQLite.openDatabaseAsync("workout.db");
    const [isLoading, setIsLoading] = useState(true);
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [currentWorkoutName, setCurrentWorkoutName] = useState(undefined);

    if (isLoading) {
        return (
            <View>
                <Text style={styles.text}>Loading...</Text>
            </View>
        );
    }

    return (
        <View>
            <TextInput
                value={currentWorkoutName}
                placeholder="Workout Name"
                onChangeText={() => setCurrentWorkoutName}
            ></TextInput>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 20,
        fontWeight: "normal",
        color: Colors.dark.text,
        marginVertical: 5,
    },
});
