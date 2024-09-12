import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator } from "react-native";
import { useState } from "react";
import { Colors } from "@/src/constants/Colors";
import * as SQLite from "expo-sqlite";
import { useSQLiteContext, SQLiteDatabase } from "expo-sqlite";
import { Exercise, Workout } from "../types/exercises.types";

export const addWorkout: string = "INSERT INTO workouts (name) VALUES ($1)";
export const addExercise: string = "INSERT INTO exercises (name, sets, repetitions, workoutId) VALUES ($1, $2, $3, $4)";
export const getExercise: string = "SELECT * FROM exercises WHERE id = $1";
export const getAllExercise: string = "SELECT * FROM exercises";
export const checkExerciseExistsByName: string = "SELECT EXISTS (SELECT 1 FROM exercises WHERE name = $1)";
export const checkExerciseExistsByID: string = "SELECT EXISTS (SELECT 1 FROM exercises WHERE id = $1)";

const MAX_WORKOUT_NAME_LENGTH = 35;
const MAX_EXERCISE_NAME_LENGTH = 50;
const MAX_EXERCISE_LENGTH = 3;

export const AddWorkout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentWorkoutName, setCurrentWorkoutName] = useState<string>("");
    const [currentExercise, setCurrentExercise] = useState<string>("");
    const [currentSets, setCurrentSets] = useState<number | "">("");
    const [currentReps, setCurrentReps] = useState<number | "">("");

    if (isLoading) {
        return (
            <View>
                <Text style={styles.text}>Loading...</Text>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    const execAddWorkout = () => {
        const db: SQLiteDatabase = useSQLiteContext();
        if (db) {
            const add = async () => {
                try {
                    const statement = await db.prepareAsync(addWorkout);
                    try {
                        const result = await statement.executeAsync<{ $1: string }>({
                            $1: currentWorkoutName,
                        });
                        if (result) {
                            try {
                                const getWorkoutIdResult: any = await db.getFirstAsync(`
                                    SELECT id FROM workouts ORDER BY id DESC LIMIT 1;
                                    `);
                                console.log("Query result:", getWorkoutIdResult.id);
                                if (getWorkoutIdResult) {
                                    const workoutId = getWorkoutIdResult.id;
                                    execAddExercise(workoutId);
                                }
                            } catch (error) {
                                console.error("ERROR SELECTING WORKOUT ID AND ADDING EXERCISE:", error);
                            }
                        }
                    } catch (error) {
                        console.error("ERROR ADDING WORKOUT:", error);
                    } finally {
                        await statement.finalizeAsync();
                    }
                } catch (error) {
                    console.error("ERROR PREPARING SQL STATEMENT:", error);
                }
            };
            add();
        }
    };

    // Use AddWorkout First
    const execAddExercise = (workoutId: number) => {
        const db: SQLiteDatabase = useSQLiteContext();
        if (db) {
            const add = async () => {
                const statement = await db.prepareAsync(addExercise);
                try {
                    const result = await statement.executeAsync<{ $1: string; $2: number; $3: number; $4: number }>({
                        $1: currentExercise,
                        $2: 4,
                        $3: 5,
                        $4: workoutId,
                    });
                } catch (error) {
                    console.error("ERROR ADDING EXERCISE:", error);
                } finally {
                    await statement.finalizeAsync();
                }
            };
            add();
        }
    };
    const execGetExercise = () => {};

    const execGetAllWorkouts = () => {
        const db: SQLiteDatabase = useSQLiteContext();
        if (db) {
            const getWorkoutsAndExercises = async (): Promise<
                | {
                      workoutsResult: Workout[];
                      exercisesResult: Exercise[];
                  }
                | undefined
            > => {
                try {
                    const workoutsResult: Array<Workout> = await db.getAllAsync(`
                        SELECT * FROM workouts
                    `);

                    const exercisesResult: Array<Exercise> = await db.getAllAsync(`
                        SELECT * FROM exercises
                    `);
                    return { workoutsResult, exercisesResult };
                } catch (error) {
                    console.error("FAILED TO GET ALL WORKOUTS", error);
                }
            };
            const printAll = async () => {
                const result = await getWorkoutsAndExercises();
                if (result) {
                    const exerciseMap: Map<number, Exercise[]> = new Map();

                    for (const exercise of result.exercisesResult as Exercise[]) {
                        const workoutId = exercise.workoutId;

                        if (!exerciseMap.has(workoutId)) {
                            exerciseMap.set(workoutId, []);
                        }
                        exerciseMap.get(workoutId)?.push(exercise);
                    }

                    const workoutsMap = result.workoutsResult.map((workout) => ({
                        ...workout,
                        exercises: exerciseMap.get(workout.id) || [],
                    }));

                    workoutsMap.forEach((workout) => {
                        console.log(workout.name);
                        console.log(workout.exercises);
                    });
                }
            };
            printAll();
        }
    };

    const execCheckExerciseExistsByName = () => {};
    const execCheckExerciseExistsById = () => {};

    const wipeDb = () => {
        const db: SQLiteDatabase = useSQLiteContext();
        if (db) {
            const deleteIt = async () => {
                db.closeAsync();
                await SQLite.deleteDatabaseAsync("workout.db");
            };
            deleteIt();
            console.log("deleted db");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.TextContainer}>
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
            <View style={styles.container}>
                <View style={[styles.InnerTextContainer, styles.TopTextContainer]}>
                    <Text style={styles.textTitle}>Exercise Type</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType="default"
                        maxLength={MAX_EXERCISE_NAME_LENGTH}
                        placeholder="Enter Exercise"
                        placeholderTextColor={styles.textInput.color}
                        value={currentExercise}
                        onChangeText={(exercise: string) => {
                            setCurrentExercise(exercise);
                        }}
                    ></TextInput>
                </View>
                <View style={[styles.InnerTextContainer, styles.MiddleTextContainer]}>
                    <Text style={styles.textTitle}>Sets</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType="numeric"
                        maxLength={MAX_EXERCISE_LENGTH}
                        placeholder="Enter Sets"
                        placeholderTextColor={styles.textInput.color}
                        value={currentSets.toString()}
                        onChangeText={(currentSets: string) => {
                            const value = parseInt(currentSets, 10);
                            if (!isNaN(value)) {
                                setCurrentSets(parseInt(currentSets, 10));
                            } else {
                                setCurrentSets("");
                            }
                        }}
                    ></TextInput>
                </View>
                <View style={[styles.InnerTextContainer, styles.BottomTextContainer]}>
                    <Text style={styles.textTitle}>Repetitions</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType="numeric"
                        maxLength={MAX_EXERCISE_LENGTH}
                        placeholder="Enter Repetitions"
                        placeholderTextColor={styles.textInput.color}
                        value={currentReps === "" ? "" : currentReps.toString()}
                        onChangeText={(currentReps: string) => {
                            const value = parseInt(currentReps, 10);
                            if (!isNaN(value)) {
                                setCurrentReps(parseInt(currentReps, 10));
                            } else {
                                setCurrentReps("");
                            }
                        }}
                    ></TextInput>
                </View>
            </View>
            <Button title="ADD WORKOUT" onPress={execGetAllWorkouts}></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    TextContainer: {
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
    InnerTextContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: Colors.dark.tertiaryBackground,
    },
    TopTextContainer: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    MiddleTextContainer: {
        borderTopWidth: 0.2,
        borderTopColor: Colors.dark.text,
    },
    BottomTextContainer: {
        borderTopWidth: 0.2,
        borderTopColor: Colors.dark.text,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    text: {
        fontSize: 20,
        fontWeight: "normal",
        color: Colors.dark.text,
    },
    textTitle: {
        fontSize: 15,
        fontWeight: "normal",
        color: Colors.dark.textSecondary,
        marginVertical: 5,
    },
    textInput: {
        fontSize: 15,
        fontWeight: "normal",
        color: Colors.dark.text,
        marginVertical: 5,
        width: 160,
    },
});
