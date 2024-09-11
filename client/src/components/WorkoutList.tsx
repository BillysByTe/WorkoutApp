import { View, Text, FlatList, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { Exercise, Workout } from "../types/exercises.types";
import { testWorkout } from "@/assets/data/testWorkouts";

type WorkoutListProps = {
    workout: Workout[];
};

const renderExerciseList = (exercise: Exercise) => {
    return (
        <View key={exercise.id} style={styles.outerExerciseContainer}>
            <Text style={styles.text}>{exercise.name}</Text>
            <View style={styles.innerExerciseContainer}>
                <Text style={styles.text}>{exercise.sets}</Text>
                <Text style={styles.text}> x </Text>
                <Text style={styles.text}>{exercise.repetitions}</Text>
            </View>
        </View>
    );
};

export const WorkoutList = () => {
    return (
        <FlatList
            data={testWorkout}
            keyExtractor={(workoutItem: Workout) => workoutItem.id.toString()}
            renderItem={({ item }: { item: Workout }) => renderWorkoutList(item)}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={true}
        />
    );
};

const renderWorkoutList = (workout: Workout) => {
    return (
        <View style={styles.workoutContainer} key={workout.id}>
            <Text style={styles.workoutTitleText}>{workout.name}</Text>
            <FlatList
                data={workout.exercises}
                keyExtractor={(exercise: Exercise) => exercise.id.toString()}
                renderItem={({ item }) => renderExerciseList(item)}
            />
        </View>
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
    outerExerciseContainer: {},
    innerExerciseContainer: {
        flexDirection: "row",
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
    },
});
