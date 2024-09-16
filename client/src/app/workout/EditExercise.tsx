import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRef, useEffect } from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { EditExercise } from "@/src/components/workout/EditExercise";

export default function EditExercisePage() {
    const navigation = useNavigation();
    const editRef = useRef<any>(null);
    const localParams = useLocalSearchParams();
    const exerciseIdParam: any = localParams.exerciseId;
    const exerciseIdInt = parseInt(exerciseIdParam, 10);

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

    // Refs: execEditExercise()
    const handleAddPress = () => {
        /*
        const addRef = editRef.current;

        if (addRef) {
            addRef.execEditExercise();
        }
            */
    };

    return <EditExercise ref={editRef} exerciseId={exerciseIdInt} />;
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
