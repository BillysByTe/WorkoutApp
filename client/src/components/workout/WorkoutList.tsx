import { View, Text, FlatList, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { Exercise, Workout } from "../../types/exercises.types";
import { useSQLiteContext, SQLiteDatabase } from "expo-sqlite";
import { useEffect, useState } from "react";

type WorkoutListProps = {
    exercises: Exercise[];
    id: number;
    name: string;
};

const getAllExercise: string = "SELECT * FROM exercises";
const getAllWorkout: string = "SELECT * FROM workouts";

export const WorkoutList = () => {
    const db: SQLiteDatabase = useSQLiteContext();

    const [workoutsList, setWorkoutsList] = useState<WorkoutListProps[]>([]);

    useEffect(() => {
        execGetAllWorkoutsAndExercises();
    }, [workoutsList]);

    const execGetAllWorkoutsAndExercises = async () => {
        if (db) {
            try {
                const workoutsResult: Workout[] = await db.getAllAsync(getAllWorkout);
                const exercisesResult: Exercise[] = await db.getAllAsync(getAllExercise);

                const exerciseMap: Map<number, Exercise[]> = new Map();

                for (const exercise of exercisesResult as Exercise[]) {
                    const workoutId = exercise.workoutId;

                    if (!exerciseMap.has(workoutId)) {
                        exerciseMap.set(workoutId, []);
                    }
                    exerciseMap.get(workoutId)?.push(exercise);
                }

                const workoutsMap: WorkoutListProps[] = workoutsResult.map((workout) => ({
                    ...workout,
                    exercises: exerciseMap.get(workout.id) || [],
                }));

                setWorkoutsList(workoutsMap);
            } catch (error) {
                console.error("FAILED TO GET ALL WORKOUTS", error);
            }
        }
    };

    const renderWorkoutList = ({ item }: { item: WorkoutListProps }) => {
        return (
            <View style={styles.workoutContainer}>
                <Text style={styles.workoutTitleText}>{item.name}</Text>
                <FlatList
                    data={item.exercises}
                    renderItem={renderExerciseList}
                    keyExtractor={(item) => item.id.toString()}
                    removeClippedSubviews={true}
                    showsVerticalScrollIndicator={true}
                />
            </View>
        );
    };

    const renderExerciseList = ({ item }: { item: Exercise }) => {
        return (
            <View key={item.id} style={styles.ExerciseContainer}>
                <Text style={styles.text}>{item.name} </Text>
                <Text style={styles.text}>
                    {item.sets} x {item.repetitions}
                </Text>
            </View>
        );
    };

    return (
        <FlatList
            data={workoutsList}
            renderItem={renderWorkoutList}
            keyExtractor={(item) => item.id.toString()}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={true}
        />
    );
};

const styles = StyleSheet.create({
    workoutContainer: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 15,
        backgroundColor: Colors.dark.secondaryBackground,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    ExerciseContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    workoutTitleText: {
        fontSize: 24,
        fontWeight: "normal",
        color: Colors.dark.text,
        marginVertical: 0,
        marginRight: 0,
    },
    text: {
        fontSize: 18,
        fontWeight: "normal",
        color: Colors.dark.text,
        marginVertical: 0,
        marginRight: 0,
        width: "85%",
    },
});
