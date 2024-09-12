CREATE TABLE workouts (
    id INTEGER PRIMARY KEY,
    name VARCHAR(35) NOT NULL
);

CREATE TABLE exercises (
    id INTEGER PRIMARY KEY,
    workoutId INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,
    sets INT NOT NULL CHECK (sets >= 0 and sets <= 100),
    repetitions INT NOT NULL CHECK (repetitions >= 0 and repetitions <= 100),
    FOREIGN KEY (workoutId) REFERENCES workout (id) ON DELETE CASCADE
);

CREATE TABLE exercise_set(
    id BIGSERIAL PRIMARY KEY,
    exercise_id INT NOT NULL REFERENCES exercise(id),
    set_number INT NOT NULL CHECK (set_number > 0 and set_number <= 50),
    weight DECIMAL NOT NULL DEFAULT 0 CHECK (weight >= 0 and weight <= 1500),
    intensity INT NOT NULL DEFAULT 0 CHECK (intensity >= 0 and intensity <= 100)
);
