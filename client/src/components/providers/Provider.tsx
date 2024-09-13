import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";
import { useState, Suspense } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export const workoutTable: string = `
                        CREATE TABLE IF NOT EXISTS workouts (
                        id INTEGER PRIMARY KEY,
                        name VARCHAR(35) NOT NULL
                        );
                    `;
export const exerciseTable: string = `
                        CREATE TABLE IF NOT EXISTS exercises (
                        id INTEGER PRIMARY KEY,
                        workoutId INTEGER NOT NULL, 
                        name VARCHAR(50) NOT NULL,
                        sets INT NOT NULL CHECK (sets >= 0 and sets <= 100),
                        repetitions INT NOT NULL CHECK (repetitions >= 0 and repetitions <= 100),
                        FOREIGN KEY (workoutId) REFERENCES workouts (id) ON DELETE CASCADE
                        );
                    `;
export function WorkoutProviders({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    const initDb = async (db: SQLiteDatabase) => {
        //const DATABASE_VERSION = 1;
        if (db) {
            try {
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
