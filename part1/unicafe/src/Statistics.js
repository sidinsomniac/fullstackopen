import React from 'react';

const calcAvg = (...num) => {
    let sum = num.reduce((a, b) => a + b, 0);
    return sum / num.length;
};

const calcPtg = (num, total) => {
    return (num / total) * 100;
};

const Statistics = ({ feedBack: { good, neutral, bad } }) => {
    if (good || neutral || bad)
        return (
            <div>
                <h1>statistics</h1>
                <p>good {good}</p>
                <p>neutral {neutral}</p>
                <p>bad {bad}</p>
                <p>all {good + neutral + bad}</p>
                <p>average {calcAvg(good, neutral, bad)}</p>
                <p>positive {calcPtg(good, good + neutral + bad)}%</p>
            </div>);
    return 'No feedback given.';
};

export default Statistics;