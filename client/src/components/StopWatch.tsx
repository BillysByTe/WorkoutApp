import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export function StopWatch() {
    const [time, setTime] = useState(0);

    useEffect(() => {});
    return (
        <View>
            <View>
                <Text></Text>
            </View>
        </View>
    );
}

const timertest = () => {
    const time = new Date();
    const seconds = time.getSeconds();
};
