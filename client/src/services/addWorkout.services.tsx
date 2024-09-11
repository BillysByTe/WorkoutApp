import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { useState } from "react";
import { Colors } from "../constants/Colors";
import * as SQLite from "expo-sqlite";
import { Exercise, Workout } from "../types/exercises.types";

export const AddWorkout = () => {
    const db = SQLite.openDatabaseAsync("workout.db");
    const [isLoading, setIsLoading] = useState(false);
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
        <View style={styles.container}>
            <View style={styles.TextContainer}>
                <Text style={styles.textTitle}>Workout Name</Text>
                <TextInput
                    style={styles.textInput}
                    value={currentWorkoutName}
                    maxLength={50}
                    placeholder="Enter Workout Name"
                    placeholderTextColor={styles.textInput.color}
                    onChangeText={() => setCurrentWorkoutName}
                ></TextInput>
            </View>
            {/*<AddExerciseList />*/}
        </View>
    );
};

const AddExerciseList = () => {
    const [currentWorkoutName, setCurrentWorkoutName] = useState(undefined);
    const [currentSetNumber, setCurrentSetNumber] = useState(undefined);

    const [inputBox, setInputBox] = useState([]);

    return <View style={styles.container}>{
        
    }
        
    </View>;
};

const renderAddExerciseListItem = (exercise: Exercise) => {
    return (
        <View style={[styles.InnerTextContainer, styles.TopTextContainer]}>
            <Text style={styles.textTitle}>Exercise Type</Text>
            <TextInput
                style={styles.textInput}
                keyboardType="default"
                //value={}
                maxLength={50}
                placeholder="Enter Exercise"
                placeholderTextColor={styles.textInput.color}
                onChangeText={() => {}}
            ></TextInput>
        </View>
        /*
        <View style={styles.container}>
            <View style={[styles.InnerTextContainer, styles.TopTextContainer]}>
                <Text style={styles.textTitle}>Exercise Type</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType="default"
                    //value={}
                    maxLength={50}
                    placeholder="Enter Exercise"
                    placeholderTextColor={styles.textInput.color}
                    onChangeText={() => {}}
                ></TextInput>
            </View>
            <View style={[styles.InnerTextContainer, styles.MiddleTextContainer]}>
                <Text style={styles.textTitle}>Sets</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    //value={}
                    maxLength={3}
                    placeholder="Enter Sets"
                    placeholderTextColor={styles.textInput.color}
                    onChangeText={() => {}}
                ></TextInput>
            </View>
            <View style={[styles.InnerTextContainer, styles.BottomTextContainer]}>
                <Text style={styles.textTitle}>Repetitions</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType="numeric"
                    //value={}
                    maxLength={3}
                    placeholder="Enter Repititions"
                    placeholderTextColor={styles.textInput.color}
                    onChangeText={() => {}}
                ></TextInput>
            </View>
        </View>
        */
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
