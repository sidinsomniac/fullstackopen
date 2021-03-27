import React from 'react';
import Statistic from './Statistic';

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
                <Statistic text={'good'} value={good} />
                <Statistic text={'neutral'} value={neutral} />
                <Statistic text={'bad'} value={bad} />
                <Statistic text={'all'} value={good + neutral + bad} />
                <Statistic text={'average'} value={calcAvg(good, neutral, bad)} />
                <Statistic text={'positive'} value={calcPtg(good, good + neutral + bad) + '%'} />
            </div>);
    return 'No feedback given.';
};

export default Statistics;