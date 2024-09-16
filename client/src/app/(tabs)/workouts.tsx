import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Colors } from "@/src/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { WorkoutList } from "@/src/components/workout/WorkoutList";

export default function WorkoutScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.text}>Workouts</Text>
                <TouchableOpacity style={styles.toggleButton}>
                    <Link push href="/workout/AddWorkout" style={styles.text}>
                        <MaterialCommunityIcons name="plus" size={35} color={Colors.dark.textTertiary} />
                    </Link>
                </TouchableOpacity>
            </View>
            <WorkoutList />
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
        paddingTop: 40,
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
        paddingTop: 25,
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
