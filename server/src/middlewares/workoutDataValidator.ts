import { Request, Response, NextFunction } from "express";
import { ExerciseSchema, UpdateExerciseSchema } from "../models/exercise.schema";
import { ExerciseData } from "../types/exercise.types";
import { ZodError } from "zod";

import { checkExerciseExistsByID, checkExerciseExistsByName } from "../services/workout.services";
import { pool } from "../db/db";

export const validateExerciseData = (req: Request, res: Response, next: NextFunction) => {
    try {
        ExerciseSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const validationErrors = error.errors.map((err) => err.message);
            return res.status(400).json({ message: validationErrors });
        }
        return res.status(400).json({ message: "Internal Server Error" });
    }
};

export const validateUpdateExerciseData = (req: Request, res: Response, next: NextFunction) => {
    try {
        UpdateExerciseSchema.parse(req.body);

        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const validationErrors = error.errors.map((err) => err.message);
            return res.status(400).json({ message: validationErrors });
        }
        return res.status(400).json({ message: "Internal Server Error" });
    }
};

export const validateExerciseID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check if exercise exists already
        const checkResult = await pool.query(checkExerciseExistsByID, [parseInt(req.params.id, 10)]);

        if (!checkResult.rows[0].exists) {
            return res.status(404).json({ message: "Error: Exercise not found" });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Internal Server Error" });
    }
};

export const validateExerciseName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exerciseData: ExerciseData = req.body;

        // Check if exercise exists already
        const checkResult = await pool.query(checkExerciseExistsByName, [exerciseData.name]);

        if (checkResult.rows[0].exists) {
            return res.status(409).json({ message: "Error: Exercise already exists" });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Internal Server Error" });
    }
};
