import React from 'react';

const Header = props => {
    const { course: { name } } = props;
    return (
        <h2>{name}</h2>
    );
};

export default Header;