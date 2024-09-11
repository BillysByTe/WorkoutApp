export type Exercise = {
    id: number;
    name: string;
    sets: number;
    repetitions: number;
};

export type Workout = {
    id: number;
    name: string;
    exercises: Exercise[];
};
