import React from 'react';
import Content from "./Content";
import Header from './Header';
import Total from "./Total";

const App = () => {
    const course = 'Half Stack application development';
    const courseInfo = {
        part1: 'Fundamentals of React',
        exercises1: 10,
        part2: 'Using props to pass data',
        exercises2: 7,
        part3: 'State of a component',
        exercises3: 14,
    };

    return (
        <div>
            <Header course={course} />
            <Content courseInfo={courseInfo} />
            <Total courseInfo={courseInfo} />
        </div>
    );
};

export default App;