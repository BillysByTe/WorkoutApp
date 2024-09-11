import { StyleSheet, View } from "react-native";
import { Colors } from "../../../src/constants/Colors";

export default function TrainingScreen() {
    return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 30,
        fontWeight: "normal",
        color: Colors.dark.text,
    },
});
