import { Workout, Exercise } from "@/src/types/exercises.types";

export const testWorkout: Workout[] = [
    {
        id: 1,
        name: "Push Workout",
        exercises: [
            {
                id: 1,
                name: "Flat Bench Press",
                sets: 4,
                repetitions: 5,
            },
            {
                id: 2,
                name: "Seated Shoulder Press",
                sets: 4,
                repetitions: 12,
            },
            {
                id: 3,
                name: "Lateral Raises",
                sets: 3,
                repetitions: 15,
            },
            {
                id: 4,
                name: "Tricep Overhead Extensions",
                sets: 3,
                repetitions: 12,
            },
            {
                id: 5,
                name: "Tricep Pushdowns",
                sets: 3,
                repetitions: 12,
            },
        ],
    },
    {
        id: 2,
        name: "Pull Workout",
        exercises: [
            {
                id: 1,
                name: "Deadlift",
                sets: 4,
                repetitions: 5,
            },
            {
                id: 2,
                name: "Row",
                sets: 4,
                repetitions: 12,
            },
            {
                id: 3,
                name: "Assisted Pullups",
                sets: 2,
                repetitions: 12,
            },
            {
                id: 4,
                name: "Reverse Pec Deck",
                sets: 4,
                repetitions: 12,
            },
            {
                id: 5,
                name: "Bicep Curl",
                sets: 3,
                repetitions: 12,
            },
            {
                id: 6,
                name: "Hammer Curl",
                sets: 3,
                repetitions: 12,
            },
        ],
    },
    {
        id: 3,
        name: "Leg Workout",
        exercises: [
            {
                id: 1,
                name: "Squat",
                sets: 4,
                repetitions: 5,
            },
            {
                id: 2,
                name: "Seated Hamstring Curl",
                sets: 3,
                repetitions: 12,
            },
            {
                id: 3,
                name: "Hip Adductor Machine",
                sets: 3,
                repetitions: 12,
            },
            {
                id: 4,
                name: "Leg Press Calf Raises",
                sets: 3,
                repetitions: 12,
            },
        ],
    },
];
