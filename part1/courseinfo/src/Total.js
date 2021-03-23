import React from 'react';

const Total = props => {
    return (
        <p>Number of exercises {props.courseInfo.exercises1 + props.courseInfo.exercises2 + props.courseInfo.exercises3}</p>
    );
};

export default Total;