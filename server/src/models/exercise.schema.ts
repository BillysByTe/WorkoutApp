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

export const UpdateExerciseSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1)
            .refine((val) => val !== "", {
                message: "Name must not be empty",
                path: ["name"],
            })
            .optional(),
        sets: z
            .number()
            .int()
            .nonnegative()
            .refine((val) => val >= 0 && val <= 100, {
                message: "Sets must be a non-negative integer less than or equal to 100 and not zero",
                path: ["sets"],
            })
            .optional(),
        repetitions: z
            .number()
            .int()
            .nonnegative()
            .refine((val) => val >= 0 && val <= 100, {
                message: "Repetitions must be a non-negative integer less than or equal to 100 and not zero",
                path: ["repetitions"],
            })
            .optional(),
    })
    .refine((data) => data.name !== undefined || data.sets !== undefined || data.repetitions !== undefined, {
        message: "At least one of name, sets, and repetitions is required",
    });

export type ExerciseData = z.infer<typeof ExerciseSchema>;
export type UpdateExerciseData = z.infer<typeof UpdateExerciseSchema>;
