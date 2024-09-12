export type Workout = {
    id: number;
    name: string;
    exercises: Exercise[];
};

export type Exercise = {
    id: number;
    workoutId: number;
    name: string;
    sets: number;
    repetitions: number;
};
