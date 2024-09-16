import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { AddExercise } from "@/src/components/workout/AddExercise";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useRef } from "react";

export default function AddExercisePage() {
    const localParams = useLocalSearchParams();
    const workoutIdParam: any = localParams.workoutId;
    const workoutIdInt = parseInt(workoutIdParam, 10);

    const navigation = useNavigation();
    const addExerciseRef = useRef<any>(null);

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

    // Refs: execAddExercise()
    const handleAddPress = () => {
        const addRef = addExerciseRef.current;

        if (addRef) {
            addRef.execAddExercise();
        }
    };

    return (
        <View style={styles.container}>
            <AddExercise ref={addExerciseRef} workoutId={workoutIdInt} />
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
