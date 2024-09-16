import { StyleSheet, View, TouchableOpacity, Modal, Text } from "react-native";
import { useRef } from "react";
import { Colors } from "@/src/constants/Colors";
import { AddWorkout } from "../workout/AddWorkout";

export function AddWorkoutModal({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {
    const addWorkoutRef = useRef<any>(null);

    const handlePress = () => {
        const add = addWorkoutRef.current;
        if (add) {
            add.execAddWorkout();
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View style={styles.modalContentContainer}>
                <View style={styles.modalContentContainerT}>
                    <TouchableOpacity style={styles.toggleButtonLeft} onPress={onClose}>
                        <Text style={styles.text}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toggleButtonRight} onPress={handlePress}>
                        <Text style={styles.text}>Add</Text>
                    </TouchableOpacity>
                </View>
                <AddWorkout ref={addWorkoutRef} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContentContainer: {
        backgroundColor: Colors.dark.secondaryBackground,
        padding: 15,
        paddingTop: 0,
        height: "90%",
        width: "100%",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        position: "absolute",
        bottom: 0,
    },
    modalContentContainerT: {
        backgroundColor: Colors.dark.secondaryBackground,
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    toggleButtonLeft: {
        left: -10,
        top: 0,
    },
    toggleButtonRight: {
        right: -10,
        top: -5,
    },
    text: {
        fontSize: 17,
        fontWeight: "normal",
        color: Colors.dark.textTertiary,
        marginVertical: 5,
    },
});
