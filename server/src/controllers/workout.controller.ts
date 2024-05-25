import { Request, Response } from "express";
import { pool } from "../db/db";

import { ExerciseData } from "../types/exercise.types";
import {
    checkExerciseExistsByName,
    addExercise,
    getExercise,
    getAllExercise,
    checkExerciseExistsByID,
    editExercise,
    removeExercise,
} from "../services/workout.services";

export const createExercise = async (req: Request, res: Response) => {
    try {
        const exerciseData: ExerciseData = req.body;

        const addResult = await pool.query(addExercise, [
            exerciseData.name,
            exerciseData.sets,
            exerciseData.repetitions,
        ]);

        return res.status(201).json({ message: "Successfully added exercise" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const fetchExercise = async (req: Request, res: Response) => {
    try {
        const fetchResult = await pool.query(getExercise, [parseInt(req.params.id, 10)]);

        return res.status(200).json({ message: "Successfully found exercise" });
    } catch (error) {
        console.error(error);
    }
};

export const fetchAllExercises = async (req: Request, res: Response) => {
    try {
    } catch (error) {
        console.error(error);
    }
};

export const updateExercise = async (req: Request, res: Response) => {
    try {
        const exerciseData: ExerciseData = req.body;

        const editProperties = editExercise(
            parseInt(req.params.id, 10),
            exerciseData.name,
            exerciseData.sets,
            exerciseData.repetitions,
        );

        console.log(editProperties.editStatement);

        const updateResult = await pool.query(editProperties.editStatement, editProperties.argumentArr);

        return res.status(200).json({ message: "Successfully updated exercise" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteExercise = async (req: Request, res: Response) => {
    try {
        const deleteResult = await pool.query(removeExercise, [parseInt(req.params.id, 10)]);

        return res.status(200).json({ message: "Successfully removed exercise" });
    } catch (error) {
        console.error(error);
    }
};
