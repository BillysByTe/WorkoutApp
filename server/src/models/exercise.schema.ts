import { z } from "zod";

export const ExerciseSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1)
        .refine((val) => val !== "", {
            message: "Name must not be empty",
            path: ["name"],
        }),
    sets: z
        .number()
        .int()
        .nonnegative()
        .refine((val) => val >= 0 && val <= 100, {
            message: "Sets must be a non-negative integer less than or equal to 100 and not zero",
            path: ["sets"],
        }),
    repetitions: z
        .number()
        .int()
        .nonnegative()
        .refine((val) => val >= 0 && val <= 100, {
            message: "Repetitions must be a non-negative integer less than or equal to 100 and not zero",
            path: ["repetitions"],
        }),
});

type ExerciseData = z.infer<typeof ExerciseSchema>;
