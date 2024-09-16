import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { getSingleWorkout, MAX_WORKOUT_NAME_LENGTH, updateSingleWorkout } from "@/src/db/db";

export const EditWorkout = forwardRef((props: { workoutId: number }, ref) => {
    const db: SQLiteDatabase = useSQLiteContext();
    const [currentWorkoutName, setCurrentWorkoutName] = useState<string>("");

    useImperativeHandle(ref, () => ({
        execEditWorkout,
    }));

    useEffect(() => {
        execGetWorkout();
    }, []);

    const execEditWorkout = async () => {
        if (db) {
            try {
                await db.runAsync(updateSingleWorkout, [currentWorkoutName, props.workoutId]);
            } catch (error) {
                console.error("ERROR UPDATING WORKOUT:", error);
            }
        }
    };

    const execGetWorkout = async () => {
        if (db) {
            const workoutId = props.workoutId;
            const statement = await db.prepareAsync(getSingleWorkout);
            try {
                const result = await statement.executeAsync<{ $1: number }>({
                    $1: workoutId,
                });

                if (result) {
                    const workoutRow: any = await result.getFirstAsync();

                    if (workoutRow) {
                        setCurrentWorkoutName(workoutRow.name);
                    }
                }
            } catch (error) {
                console.error("ERROR FETCHING WORKOUT:", error);
            } finally {
                await statement.finalizeAsync;
            }
        }
    };

    return (
        <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Workout Name</Text>
            <TextInput
                style={styles.textInput}
                keyboardType="default"
                maxLength={MAX_WORKOUT_NAME_LENGTH}
                placeholderTextColor={styles.textInput.color}
                placeholder="Enter Name"
                value={currentWorkoutName}
                onChangeText={(name: string) => {
                    setCurrentWorkoutName(name);
                }}
            ></TextInput>
        </View>
    );
});

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 5,
        backgroundColor: Colors.dark.tertiaryBackground,
        borderRadius: 5,
        borderBottomWidth: 0.2,
        borderBottomColor: Colors.dark.text,
    },
    text: {
        fontSize: 20,
        fontWeight: "normal",
        color: Colors.dark.text,
    },
    textTitle: {
        fontSize: 16,
        fontWeight: "normal",
        color: Colors.dark.textSecondary,
        marginVertical: 5,
    },
    textInput: {
        fontSize: 16,
        fontWeight: "normal",
        color: Colors.dark.text,
        marginVertical: 5,
        width: 160,
    },
});
