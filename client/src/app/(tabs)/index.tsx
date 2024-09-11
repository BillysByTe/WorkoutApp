import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { getGreeting } from "../../utils/greetingTime";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ ...styles.welcomeText }}>{getGreeting()} Billy.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        backgroundColor: Colors.dark.secondaryBackground,
        paddingLeft: 15,
        paddingRight: 75,
        paddingTop: 10,
        paddingBottom: 10,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: "400",
        color: Colors.dark.text,
        marginVertical: 10,
        marginRight: 40,
    },
    text: {
        fontSize: 30,
        fontWeight: "normal",
        color: Colors.dark.text,
    },
});
