interface exerciseStats {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number;
}

type ratingTypes = 1 | 2 | 3 | 4;
type ratingDescription = 'poor' | 'not too bad but could be better' | 'perfect' | 'outstanding';

const ratingChart: ratingDescription[] = ['poor', 'not too bad but could be better', 'perfect', 'outstanding'];

const getRating = (average: number, target: number): ratingTypes => {
    if (average < target - 1) return 1;
    else if (average < target && average > target - 1) return 2;
    else if (average >= target && average < target + 1) return 3;
    else return 4;
};

const calculateExercises = (exerciseHours: number[], target: number): exerciseStats => {
    const periodLength: number = exerciseHours.length;
    const trainingDays: number = exerciseHours.filter(hours => hours !== 0).length;
    const totalHours: number = exerciseHours.reduce((a, b) => a + b, 0);
    const average: number = totalHours / periodLength;
    const success = average > target;
    const rating: number = getRating(average, target);
    const ratingDescription: ratingDescription = ratingChart[rating - 1];
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
