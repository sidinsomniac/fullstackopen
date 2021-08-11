interface MeasurementValues {
    height: number;
    weight: number;
}

const parseBMIArguments = (args: Array<string>): MeasurementValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (height: number, weight: number): string => {
    const heightInMetres: number = height / 100;
    const Bmi: number = weight / heightInMetres ** 2;
    let remarks: string = "";

    if (Bmi <= 18) remarks = "Low (Underweight)";
    else if (Bmi > 18 && Bmi < 25) remarks = "Normal (healthy weight)";
    else remarks = "High (Overweight)";

    return remarks;
};

try {
    const { height, weight } = parseBMIArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (err) {
    console.log('Error, something bad happened, message: ', err.message);
}