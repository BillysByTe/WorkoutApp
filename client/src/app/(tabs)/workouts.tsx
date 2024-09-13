import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Colors } from "@/src/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { WorkoutList } from "@/src/components/WorkoutList";
import { AddWorkoutModal } from "@/src/components/modals/WorkoutModal";

export default function WorkoutScreen() {
    const [isModalVisible, setisModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.text}>Workouts</Text>
                <TouchableOpacity style={styles.toggleButton} onPress={() => setisModalVisible(true)}>
                    <MaterialCommunityIcons name="plus" size={35} color={Colors.dark.textTertiary} />
                </TouchableOpacity>
            </View>
            <WorkoutList />
            <AddWorkoutModal isVisible={isModalVisible} onClose={() => setisModalVisible(false)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        backgroundColor: Colors.dark.secondaryBackground,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    modalContentContainer: {
        flex: 1,
        backgroundColor: Colors.dark.secondaryBackground,
        padding: 15,
    },
    toggleButton: {
        position: "absolute",
        right: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: "normal",
        color: Colors.dark.text,
        marginVertical: 5,
    },
});
