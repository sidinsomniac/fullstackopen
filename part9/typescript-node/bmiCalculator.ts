const calculateBmi = (height: number, weight: number): string => {
    const heightInMetres: number = height / 100;
    const Bmi: number = weight / heightInMetres ** 2;
    let remarks: string = "";

    if (Bmi <= 18) remarks = "Low (Underweight)";
    else if (Bmi > 18 && Bmi < 25) remarks = "Normal (healthy weight)";
    else remarks = "High (Overweight)";

    return remarks;
};

console.log(calculateBmi(180, 74));