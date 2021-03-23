import React from 'react';
import Part from "./Part";

const Content = props => {
    return (
        <>
            <Part part={props.courseInfo.part1} exercise={props.courseInfo.exercises1} />
            <Part part={props.courseInfo.part2} exercise={props.courseInfo.exercises2} />
            <Part part={props.courseInfo.part3} exercise={props.courseInfo.exercises3} />
        </>
    );
};

export default Content;