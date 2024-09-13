import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export function StopWatch() {
    const [timerStart, setTimerStart] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number>(0.0);
    const [endTime, setEndTime] = useState<number>(0.0);

    const [elapsedTime, setElapsedTime] = useState<number>(0);

    const timertest = () => {
        // Performance.now() because date can be affected by system time

        if (timerStart === false) {
            setTimerStart(true);
            setStartTime(performance.now());
            setElapsedTime(0); // Reset elapsed time

            setInterval(() => {
                if (startTime) {
                    const currentTime = performance.now();
                    setElapsedTime(Math.floor((currentTime - startTime) / 1000)); // Convert milliseconds to seconds
                }
            }, 1000); // Update every second
        } else {
            setTimerStart(false);
            const finalTime = performance.now();
            setEndTime(finalTime);

            const timeTakenInSeconds = (finalTime - startTime) / 1000;
            console.log(`Time taken: ${timeTakenInSeconds} seconds`);
        }
    };

    const startTimer = () => {};

    const endTimer = () => {};

    return (
        <View style={styles.container}>
            <Button title="Start" onPress={timertest}></Button>
            <Button title="End" onPress={timertest}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    button: {},
});
