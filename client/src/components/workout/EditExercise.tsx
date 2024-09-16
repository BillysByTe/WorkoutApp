import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { getSingleExercise, MAX_EXERCISE_LENGTH, MAX_EXERCISE_NAME_LENGTH, updateSingleExercise } from "@/src/db/db";

export const EditExercise = forwardRef((props: { exerciseId: number }, ref) => {
    const db: SQLiteDatabase = useSQLiteContext();
    const [currentExercise, setCurrentExercise] = useState<string>("");
    const [currentSets, setCurrentSets] = useState<number | "">("");
    const [currentReps, setCurrentReps] = useState<number | "">("");

    useImperativeHandle(ref, () => ({
        execEditExercise,
    }));

    useEffect(() => {
        execGetExercise();
    }, []);

    const execEditExercise = async () => {
        if (db) {
            try {
                await db.runAsync(updateSingleExercise, [currentExercise, currentSets, currentReps, props.exerciseId]);
            } catch (error) {
                console.error("ERROR UPDATING EXERCISE:", error);
            }
        }
    };

    const execGetExercise = async () => {
        if (db) {
            const exerciseId = props.exerciseId;
            const statement = await db.prepareAsync(getSingleExercise);
            try {
                const result = await statement.executeAsync<{ $1: number }>({
                    $1: exerciseId,
                });

                if (result) {
                    const exerciseRow: any = await result.getFirstAsync();
                    if (exerciseRow) {
                        setCurrentExercise(exerciseRow.name);
                        setCurrentSets(exerciseRow.sets);
                        setCurrentReps(exerciseRow.repetitions);
                    }
                }
            } catch (error) {
                console.error("ERROR FETCHING EXERCISE:", error);
            } finally {
                await statement.finalizeAsync;
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={[styles.innerTextContainer, styles.topTextContainer]}>
                <Text style={styles.textTitle}>Exercise Type</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType="default"
                    maxLength={MAX_EXERCISE_NAME_LENGTH}
                    placeholder={currentExercise}
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
                    placeholder={currentSets.toString()}
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
                    placeholder={currentReps.toString()}
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
