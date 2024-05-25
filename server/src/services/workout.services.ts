export const checkExerciseExistsByName: string = "SELECT EXISTS (SELECT 1 FROM exercises WHERE name = $1)";
export const addExercise: string = "INSERT INTO exercises (name, sets, repetitions) VALUES ($1, $2, $3)";
export const getExercise: string = "SELECT * FROM exercises WHERE id = $1";
export const getAllExercise: string = "SELECT * FROM exercises";
export const checkExerciseExistsByID: string = "SELECT EXISTS (SELECT 1 FROM exercises WHERE id = $1)";

export const editExercise: (
    id: number,
    name: string,
    sets: number,
    repetitions: number,
) => { argumentArr: (string | number)[]; editStatement: string } = (id, name, sets, repetitions) => {
    const paramArr: string[] = [];
    const argumentArr: (string | number)[] = [id];
    let count = 2;

    if (name || name !== "") {
        paramArr.push(`name = $${count}`);
        count++;
        argumentArr.push(name);
    }

    if (sets) {
        paramArr.push(`sets = $${count}`);
        count++;
        argumentArr.push(sets);
    }

    if (repetitions) {
        paramArr.push(`repetitions = $${count}`);
        count++;
        argumentArr.push(repetitions);
    }

    const editStatement: string = `UPDATE exercises SET ${paramArr.join(", ")} WHERE id = $1`;
    return { argumentArr, editStatement };
};

export const removeExercise: string = "DELETE FROM exercises WHERE id = $1";
