import React from 'react';
import Part from "./Part";

const Content = props => {
    const { course: { parts } } = props;
    return (
        <>
            {parts.map(part => (
                <Part key={part.id} part={part.name} exercise={part.exercises} />
            ))}
        </>
    );
};

export default Content;