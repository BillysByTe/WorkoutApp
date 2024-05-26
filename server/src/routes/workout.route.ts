import express from "express";

import {
    createExercise,
    fetchExercise,
    fetchAllExercises,
    updateExercise,
    deleteExercise,
} from "../controllers/workout.controller";

import {
    validateExerciseData,
    validateUpdateExerciseData,
    validateExerciseID,
    validateExerciseName,
} from "../middlewares/workoutDataValidator";

const workoutRouter = express.Router();

workoutRouter.post("/", express.json(), validateExerciseName, validateExerciseData, createExercise);
workoutRouter.get("/:id", validateExerciseID, fetchExercise);
workoutRouter.get("/", fetchAllExercises);
workoutRouter.patch("/:id", express.json(), validateExerciseID, validateUpdateExerciseData, updateExercise);
workoutRouter.delete("/:id", validateExerciseID, deleteExercise);

export default workoutRouter;
