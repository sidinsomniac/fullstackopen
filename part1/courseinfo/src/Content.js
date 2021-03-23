import React from 'react';

const Content = props => {
    return (
        <>
            <p>
                {props.courseInfo.part1} {props.courseInfo.exercises1}
            </p>
            <p>
                {props.courseInfo.part2} {props.courseInfo.exercises2}
            </p>
            <p>
                {props.courseInfo.part3} {props.courseInfo.exercises3}
            </p>
        </>
    );
};

export default Content;