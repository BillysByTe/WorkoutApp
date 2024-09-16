import { View, Text, StyleSheet, TextInput, FlatList, Pressable, Alert } from "react-native";
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { Colors } from "@/src/constants/Colors";
import * as SQLite from "expo-sqlite";
import { useSQLiteContext, SQLiteDatabase } from "expo-sqlite";
import { Workout } from "../../types/exercises.types";
import { useRouter } from "expo-router";
import {
    insertWorkout,
    getAllWorkout,
    getPreviouslyAddedWorkoutId,
    deleteWorkout,
    MAX_WORKOUT_NAME_LENGTH,
} from "@/src/db/db";

export const AddWorkout = forwardRef((props, ref) => {
    const db: SQLiteDatabase = useSQLiteContext();
    const router = useRouter();
    const [currentWorkoutName, setCurrentWorkoutName] = useState<string>("");
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    useImperativeHandle(ref, () => ({
        execAddWorkout,
        wipeDb,
    }));

    useEffect(() => {
        execGetAllWorkouts();
    }, [workouts]);

    const execAddWorkout = async () => {
        if (db) {
            if (currentWorkoutName.length === 0) {
                alert("Workout name cannot be empty.");
                return;
            }
            const statement = await db.prepareAsync(insertWorkout);
            try {
                const result = await statement.executeAsync<{ $1: string }>({
                    $1: currentWorkoutName,
                });

                if (result) {
                    const getWorkoutIdResult: { id: number } | null =
                        await db.getFirstAsync(getPreviouslyAddedWorkoutId);

                    if (getWorkoutIdResult) {
                        const workoutId = getWorkoutIdResult.id;
                    }
                }
            } catch (error) {
                console.error("ERROR ADDING WORKOUT:", error);
            } finally {
                await statement.finalizeAsync();
                setCurrentWorkoutName("");
            }
        }
    };

    const execGetAllWorkouts = async () => {
        if (db) {
            try {
                const workoutsResult: Workout[] = await db.getAllAsync(getAllWorkout);
                setWorkouts(workoutsResult);
                return workoutsResult;
            } catch (error) {
                console.error("FAILED TO GET ALL WORKOUTS", error);
            }
        }
    };

    const wipeDb = async () => {
        if (db) {
            db.closeAsync();
            await SQLite.deleteDatabaseAsync("workout.db");
            console.log("deleted db");
        }
    };

    const execDeleteWorkout = async (id: number) => {
        if (db) {
            const statement = await db.prepareAsync(deleteWorkout);
            try {
                await statement.executeAsync<{ $1: string }>({ $1: id });
            } catch (error) {
                console.error("ERROR DELETING WORKOUT", error);
            } finally {
                await statement.finalizeAsync();
            }
        }
    };

    const renderWorkoutsNameList = ({ item }: { item: Workout }) => {
        const handleLongPress = () => {
            const handleCancel = () => {};
            const handleEdit = () => {
                if (router) {
                    router.push({
                        pathname: "/workout/EditWorkout",
                        params: { workoutId: item.id },
                    });
                }
            };
            const handleDelete = () => {
                execDeleteWorkout(item.id);
            };

            Alert.alert("Delete/Edit", "Would you like to Edit, or Delete this workout?", [
                { text: "Cancel", onPress: handleCancel },
                { text: "Delete", onPress: handleDelete },
                { text: "Edit", onPress: handleEdit },
            ]);
        };

        const handleRegularPress = () => {
            if (router) {
                router.push({
                    pathname: "/workout/AddExercise",
                    params: { workoutId: item.id },
                });
            }
        };

        return (
            <Pressable
                style={styles.workoutsListContainer}
                onPress={() => handleRegularPress()}
                onLongPress={() => handleLongPress()}
            >
                <Text style={styles.text}>{item.name}</Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
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
            <Text style={styles.listTextTitle}>Current Workouts (Select to Manage Exercises)</Text>
            <FlatList data={workouts} renderItem={renderWorkoutsNameList} keyExtractor={(item) => item.id.toString()} />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
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
    workoutsListContainer: {
        paddingVertical: 10,
        marginVertical: 10,
        marginHorizontal: 25,
        borderRadius: 5,
        backgroundColor: Colors.dark.tertiaryBackground,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    listTextTitle: {
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.dark.text,
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
