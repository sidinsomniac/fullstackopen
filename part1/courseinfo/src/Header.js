import React from 'react';

const Header = props => {
    const { course: { name } } = props;
    return (
        <h1>{name}</h1>
    );
};

export default Header;