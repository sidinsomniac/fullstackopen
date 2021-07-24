import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

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
            <Button variant="secondary" onClick={toggleVisibility}>{buttonLabel}</Button>
        </div>
        <div style={showWhenVisible}>
            {children}
            <Button variant="outline-danger" onClick={toggleVisibility}>cancel</Button>
        </div>
    </div>);
});

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
};

Togglable.displayName = "Togglable";

export default Togglable;