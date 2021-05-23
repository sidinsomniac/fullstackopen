import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef(({ children, buttonLabel }, ref) => {
    const [visible, setVisible] = useState(false);
    const hideWhenVisible = { display: visible ? "none" : "block" };
    const showWhenVisible = { display: visible ? "block" : "none" };
    const toggleVisibility = () => {
        setVisible(!visible);
    };
    useImperativeHandle(ref, () => ({
        toggleVisibility
    }));

    return (<div>
        <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>{buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
            {children}
            <button onClick={toggleVisibility}>cancel</button>
        </div>
    </div>);
});

export default Togglable;