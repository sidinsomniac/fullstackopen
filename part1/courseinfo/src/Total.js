import React from 'react';

const Total = props => {
    const { course: { parts } } = props;
    console.log(parts);
    return (
        <p>Number of exercises {parts.reduce((a, b) => {
            return (a + b.exercises);
        }, 0)}</p>
    );
};

export default Total;