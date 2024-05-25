import express from "express";

import {
    createExercise,
    fetchExercise,
    fetchAllExercises,
    updateExercise,
    deleteExercise,
} from "../controllers/workout.controller";

import { validateExerciseData, validateExerciseID, validateExerciseName } from "../middlewares/dataValidator";

const workoutRouter = express.Router();

workoutRouter.post("/", validateExerciseName, express.json(), validateExerciseData, createExercise);
workoutRouter.get("/:id", validateExerciseID, fetchExercise);
workoutRouter.get("/:", fetchAllExercises);
workoutRouter.patch("/:id", validateExerciseID, express.json(), validateExerciseData, updateExercise);
workoutRouter.delete("/:id", validateExerciseID, deleteExercise);

export default workoutRouter;
