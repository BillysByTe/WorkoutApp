import { pool } from "../db/db";
import dotenv from "dotenv";
dotenv.config();
import { promises as fs } from "fs";
import { ExerciseData } from "@/src/models/exercise.schema";

const loadExercisePreset = async () => {
    try {
        const presetData = await fs.readFile("./src/scripts/presetExercises.json", "utf-8");
        const exercisePreset: ExerciseData[] = JSON.parse(presetData);
        console.log(exercisePreset);
    } catch (error) {
        console.error(error);
    }
};

if (process.argv[2] === "--import") {
} else if (process.argv[2] === "--export") {
}
loadExercisePreset();
