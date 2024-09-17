import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";

export function StopWatch() {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [lapNumbers, setLapNumbers] = useState<number[]>([]);
    const [totalLapTimes, SetTotalLapTimes] = useState<string[]>([]);

    const intervalRef = useRef<any>(null);
    const startTimeRef = useRef<any>(0);

    useEffect(() => {
        if (isRunning) {
            interval();
        }

        return () => {
            const intervalId = intervalRef.current;
            clearInterval(intervalId);
        };
    }, [isRunning]);

    // performance.now() because computer/phone time will not affect it
    const interval = () => {
        intervalRef.current = setInterval(() => {
            setElapsedTime(performance.now() - startTimeRef.current);
        }, 100);
    };

    const formatTime = () => {
        const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const miliseconds = Math.floor((elapsedTime % 1000) / 10);

        const formatPadding = (num: number) => String(num).padStart(2, "0");

        return `${formatPadding(minutes)}:${formatPadding(seconds)}:${formatPadding(miliseconds)}`;
    };

    const handleStart = () => {
        setIsRunning(true);
        startTimeRef.current = performance.now() - elapsedTime;
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setElapsedTime(0);
        setLapNumbers([]);
    };

    const handleLap = () => {
        const NewLaps = [...lapNumbers, lapNumbers.length + 1];
        setLapNumbers(NewLaps);

        const NewLapTime = [...totalLapTimes, formatTime()];
        SetTotalLapTimes(NewLapTime);
    };

    const renderLapTable = ({ item }: { item: number }) => {
        return (
            <View style={styles.lapInnerContainer}>
                <Text style={styles.text}>Lap {item}</Text>
                <Text style={styles.text}>{formatTime()}</Text>
                <Text style={styles.text}>{formatTime()}</Text>
            </View>
        );
    };

    const LapTable = () => {
        return (
            <View style={styles.lapContainer}>
                <View style={styles.lapInnerContainer}>
                    <Text style={styles.textSecondary}>LAP NO.</Text>
                    <Text style={styles.textSecondary}>SPLIT</Text>
                    <Text style={styles.textSecondary}>TOTAL</Text>
                </View>
                <FlatList
                    data={lapNumbers.slice().reverse()}
                    renderItem={renderLapTable}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    };

    // TouchableOpacity stops registering for some reason if I don't implement it directly like this..
    return (
        <View style={styles.container}>
            <View style={styles.timerContainer}>
                <Text style={styles.timerText} adjustsFontSizeToFit numberOfLines={1}>
                    {formatTime()}
                </Text>
            </View>
            <LapTable />
            <View style={styles.bottomContainer}>
                {isRunning ? (
                    <TouchableOpacity onPressIn={handleStop}>
                        <View style={styles.button}>
                            <Text style={styles.textSecondary}>Stop</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPressIn={handleStart}>
                        <View style={styles.button}>
                            <Text style={styles.textSecondary}>Start</Text>
                        </View>
                    </TouchableOpacity>
                )}
                {isRunning ? (
                    <TouchableOpacity onPressIn={handleLap}>
                        <View style={styles.button}>
                            <Text style={styles.textSecondary}>Lap</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPressIn={handleReset}>
                        <View style={styles.button}>
                            <Text style={styles.textSecondary}>Reset</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        borderRadius: 50,
        backgroundColor: Colors.dark.tertiaryBackground,
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomContainer: {
        width: "100%",
        paddingHorizontal: 55,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    timerContainer: {
        flexDirection: "row",
    },
    lapContainer: {
        flex: 1,
        width: "100%",
    },
    lapInnerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 35,
        paddingVertical: 5,
        borderBottomColor: Colors.dark.textSecondary,
        borderBottomWidth: 0.2,
    },
    text: {
        fontSize: 20,
        fontWeight: "normal",
        color: Colors.dark.text,
    },
    textSecondary: {
        fontSize: 18,
        fontWeight: "normal",
        color: Colors.dark.textSecondary,
    },
    timerText: {
        fontSize: 70,
        fontWeight: "normal",
        color: Colors.dark.text,
    },
});
