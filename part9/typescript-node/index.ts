import express from 'express';
import { calculateBmi } from "./bmiCalculator";
const app = express();

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
        const bmi = calculateBmi(+height!, +weight!);
        res.status(200).json({
            weight,
            height,
            bmi
        });
        return;
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});