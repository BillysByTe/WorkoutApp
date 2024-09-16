import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { useNavigation } from "expo-router";

export const BackButton = ({ navigation }: any) => {
    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        color: Colors.dark.textTertiary,
        fontSize: 17,
    },
});
