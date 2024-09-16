export const enableForeignKey: string = "PRAGMA foreign_keys = ON";
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

export const insertWorkout: string = "INSERT INTO workouts (name) VALUES ($1)";
export const getAllWorkout: string = "SELECT * FROM workouts";
export const getPreviouslyAddedWorkoutId: string = "SELECT id FROM workouts ORDER BY id DESC LIMIT 1;";
export const deleteWorkout: string = "DELETE FROM workouts WHERE id = $1";
export const getSingleWorkout: string = "SELECT * FROM workouts WHERE id = $1";
export const updateSingleWorkout: string = "UPDATE workouts SET name = $1 WHERE id = $2";

export const deleteExercise: string = "DELETE FROM exercises WHERE id = $1";
export const insertExercise: string =
    "INSERT INTO exercises (name, sets, repetitions, workoutId) VALUES ($1, $2, $3, $4)";
export const getAllExercise: string = "SELECT * FROM exercises WHERE workoutId = $1";
export const getSingleExercise: string = "SELECT * FROM exercises WHERE id = $1";
export const updateSingleExercise: string = "UPDATE exercises SET name = $1, sets = $2, repetitions = $3 WHERE id = $4";

export const MAX_EXERCISE_NAME_LENGTH = 50;
export const MAX_EXERCISE_LENGTH = 3;
export const MAX_WORKOUT_NAME_LENGTH = 35;
