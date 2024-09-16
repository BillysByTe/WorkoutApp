import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { View, Text, TextInput, StyleSheet, FlatList, Pressable, Alert } from "react-native";
import { Colors } from "../../constants/Colors";
import { Exercise } from "@/src/types/exercises.types";
import {
    insertExercise,
    getAllExercise,
    MAX_EXERCISE_LENGTH,
    MAX_EXERCISE_NAME_LENGTH,
    deleteExercise,
} from "@/src/db/db";
import { useRouter } from "expo-router";

export const AddExercise = forwardRef((props: { workoutId: number }, ref) => {
    const db: SQLiteDatabase = useSQLiteContext();
    const router = useRouter();
    const [currentExercise, setCurrentExercise] = useState<string>("");
    const [currentSets, setCurrentSets] = useState<number | "">("");
    const [currentReps, setCurrentReps] = useState<number | "">("");
    const [exercises, setExercises] = useState<Exercise[]>([]);

    useImperativeHandle(ref, () => ({
        execAddExercise,
    }));

    useEffect(() => {
        execGetAllExercise();
    }, [exercises]);

    const execAddExercise = async () => {
        if (db) {
            if (currentExercise.length === 0 || currentSets === "" || currentReps === "") {
                alert("Exercise Fields cannot be empty.");
                return;
            }
            const workoutId = props.workoutId;
            const statement = await db.prepareAsync(insertExercise);
            try {
                const result = await statement.executeAsync<{ $1: string; $2: number; $3: number; $4: number }>({
                    $1: currentExercise.trim(),
                    $2: currentSets,
                    $3: currentReps,
                    $4: workoutId,
                });
            } catch (error) {
                console.error("ERROR ADDING EXERCISE:", error);
            } finally {
                await statement.finalizeAsync();
                setCurrentExercise("");
                setCurrentSets("");
                setCurrentReps("");
            }
        }
    };

    const execGetAllExercise = async () => {
        if (db) {
            const workoutId = props.workoutId;
            const statement = await db.prepareAsync(getAllExercise);
            try {
                const result = await statement.executeAsync<{ $1: number }>({
                    $1: workoutId,
                });

                if (result) {
                    const exercisesRows: any = await result.getAllAsync();
                    setExercises(exercisesRows);
                }
            } catch (error) {
                console.error("ERROR FETCHING ALL EXERCISES:", error);
            } finally {
                await statement.finalizeAsync;
            }
        }
    };

    const execDeleteExercise = async (id: number) => {
        if (db) {
            const statement = await db.prepareAsync(deleteExercise);
            try {
                const result = await statement.executeAsync<{ $1: string }>({ $1: id });
            } catch (error) {
                console.error("ERROR DELETING EXERCISE", error);
            } finally {
                await statement.finalizeAsync();
            }
        }
    };

    const RenderExerciseList = ({ item }: { item: Exercise }) => {
        const handleLongPress = () => {
            const handleCancel = () => {};
            const handleEdit = () => {
                if (router) {
                    router.push({
                        pathname: "/workout/EditExercise",
                        params: { exerciseId: item.id },
                    });
                }
            };
            const handleDelete = () => {
                execDeleteExercise(item.id);
            };

            Alert.alert("Delete/Edit", "Would you like to Edit, or Delete this exercise?", [
                { text: "Cancel", onPress: handleCancel },
                { text: "Delete", onPress: handleDelete },
                { text: "Edit", onPress: handleEdit },
            ]);
        };

        const handleRegularPress = () => {};

        return (
            <Pressable
                style={styles.exerciseListContainer}
                onPress={() => handleRegularPress()}
                onLongPress={() => handleLongPress()}
            >
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>
                    {item.sets} x {item.repetitions}
                </Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <View style={[styles.innerTextContainer, styles.topTextContainer]}>
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
            <View style={[styles.innerTextContainer, styles.middleTextContainer]}>
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
            <View style={[styles.innerTextContainer, styles.bottomTextContainer]}>
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
            <Text style={styles.listTextTitle}>Exercises List: </Text>
            <FlatList data={exercises} renderItem={RenderExerciseList} keyExtractor={(item) => item.id.toString()} />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    exerciseListContainer: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        margin: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.dark.tertiaryBackground,
        borderRadius: 5,
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
    innerTextContainer: {
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
    topTextContainer: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    middleTextContainer: {
        borderTopWidth: 0.2,
        borderTopColor: Colors.dark.text,
    },
    bottomTextContainer: {
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
    listTextTitle: {
        fontSize: 18.4,
        fontWeight: "bold",
        textAlign: "center",
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
