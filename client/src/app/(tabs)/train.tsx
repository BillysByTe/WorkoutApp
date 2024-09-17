import { StyleSheet, View } from "react-native";
import { Colors } from "../../../src/constants/Colors";
import { StopWatch } from "@/src/components/StopWatch";

export default function TrainingScreen() {
    return <StopWatch />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    text: {
        fontSize: 30,
        fontWeight: "normal",
        color: Colors.dark.text,
    },
});
