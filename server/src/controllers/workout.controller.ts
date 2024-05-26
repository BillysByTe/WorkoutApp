import { Request, Response } from "express";
import { pool } from "../db/db";
import { QueryResult } from "pg";

import { ExerciseData } from "../models/exercise.schema";
import { addExercise, getExercise, getAllExercise, editExercise, removeExercise } from "../services/workout.services";

export const createExercise = async (req: Request, res: Response) => {
    try {
        const exerciseData: ExerciseData = req.body;

        const addResult: QueryResult<ExerciseData> = await pool.query(addExercise, [
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
        const fetchResult: QueryResult<ExerciseData> = await pool.query(getExercise, [parseInt(req.params.id, 10)]);

        return res.status(200).json({
            message: "Successfully found exercise",
            exercise: fetchResult.rows[0],
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const fetchAllExercises = async (req: Request, res: Response) => {
    try {
        const fetchAllResult: QueryResult<ExerciseData> = await pool.query(getAllExercise);

        return res.status(200).json({ message: "Successfully found all exercises", exercise: fetchAllResult.rows });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateExercise = async (req: Request, res: Response) => {
    try {
        const exerciseData: ExerciseData = req.body;

        const editProperties: {
            argumentArr: (string | number)[];
            editStatement: string;
        } = editExercise(parseInt(req.params.id, 10), exerciseData.name, exerciseData.sets, exerciseData.repetitions);

        console.log(editProperties.editStatement);

        const updateResult: QueryResult<ExerciseData> = await pool.query(
            editProperties.editStatement,
            editProperties.argumentArr,
        );

        return res.status(200).json({ message: "Successfully updated exercise" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteExercise = async (req: Request, res: Response) => {
    try {
        const deleteResult: QueryResult<ExerciseData> = await pool.query(removeExercise, [parseInt(req.params.id, 10)]);

        return res.status(200).json({ message: "Successfully removed exercise" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
