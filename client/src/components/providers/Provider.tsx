import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import { useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { workoutTable, exerciseTable, enableForeignKey } from "@/src/db/db";

export function WorkoutProviders({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    const initDb = async (db: SQLiteDatabase) => {
        //const DATABASE_VERSION = 1;
        if (db) {
            try {
                await db.execAsync(enableForeignKey);
                await db.execAsync(workoutTable);
                await db.execAsync(exerciseTable);
            } catch (error) {
                console.error("Error creating table: " + error);
            } finally {
                setIsLoading(false);
            }
        }
    };
    const Loading = () => {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#a8a8a8" />
            </View>
        );
    };

    return (
        <SQLiteProvider databaseName="workout.db" onInit={initDb}>
            {isLoading ? <Loading /> : children}
        </SQLiteProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
