import { StyleSheet, View, TouchableOpacity, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../../src/constants/Colors";
import { AddWorkout } from "@/src/services/addWorkout.services";

type WorkoutModalProps = {
    isVisible: boolean;
    onClose: () => void;
};

export function AddWorkoutModal({ isVisible, onClose }: WorkoutModalProps) {
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View style={styles.modalContentContainer}>
                <TouchableOpacity style={styles.toggleButton} onPress={onClose}>
                    <MaterialCommunityIcons name="close" size={35} color={Colors.dark.secondary} />
                </TouchableOpacity>

                <AddWorkout />
            </View>
        </Modal>
    );
}

//const isModalVisible = () => {};

const styles = StyleSheet.create({
    modalContentContainer: {
        backgroundColor: Colors.dark.secondaryBackground,
        padding: 15,
        height: "90%",
        width: "100%",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        position: "absolute",
        bottom: 0,
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
