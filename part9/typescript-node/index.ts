import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if (!height || !weight) {
        return res.status(200).json({
            error: "malformatted parameters"
        });
    } else {
        const bmi = calculateBmi(+height, +weight);
        res.status(200).json({
            weight,
            height,
            bmi
        });
        return;
    }
});

app.post('/exercises', (req, res) => {
    //     eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { body: { daily_exercises, target } }: { body: { daily_exercises: number[], target: number; }; } = req;

    if (!daily_exercises.length || !target) {
        return res.status(400).json({
            error: "parameters missing"
        });
    } else {

        const mappedExerciseArray = daily_exercises.map((args: number) => isNaN(args));

        if (mappedExerciseArray.includes(true) || isNaN(target)) {
            return res.status(400).json({
                error: "malformatted parameters"
            });
        } else {
            const exerciseStats = calculateExercises(target, daily_exercises);
            return res.status(200).json(exerciseStats);
        }
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});