import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRef, useEffect } from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { EditWorkout } from "@/src/components/workout/EditWorkout";

export default function EditWorkoutPage() {
    const navigation = useNavigation();
    const editRef = useRef<any>(null);
    const localParams = useLocalSearchParams();
    const workoutIdParam: any = localParams.workoutId;
    const workoutIdInt = parseInt(workoutIdParam, 10);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <AddPress />,
        });
    }, [navigation]);

    const AddPress = () => (
        <TouchableOpacity onPress={handleAddPress}>
            <Text style={styles.text}>Confirm</Text>
        </TouchableOpacity>
    );

    // Refs: execEditWorkout()
    const handleAddPress = () => {
        const addRef = editRef.current;
        if (addRef) {
            addRef.execEditWorkout();
        }
    };

    return <EditWorkout ref={editRef} workoutId={workoutIdInt}></EditWorkout>;
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
