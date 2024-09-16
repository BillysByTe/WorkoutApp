import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AddWorkout } from "@/src/components/workout/AddWorkout";
import { useRef, useEffect } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "@/src/constants/Colors";

export default function AddWorkoutPage() {
    const addWorkoutRef = useRef<any>(null);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <AddPress />,
        });
    }, [navigation]);

    const AddPress = () => (
        <TouchableOpacity onPress={handleAddPress}>
            <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
    );

    // Refs: execGetAllWorkoutsAndExercises() execAddWorkout() wipeDb()
    const handleAddPress = () => {
        const addRef = addWorkoutRef.current;

        if (addRef) {
            addRef.execAddWorkout();
        }
    };

    return (
        <View style={styles.container}>
            <AddWorkout ref={addWorkoutRef} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
