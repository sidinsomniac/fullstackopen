import React from 'react';
import '../App.css';

const Notification = ({ message, typeOfClass }) => {
    if (message === null) {
        return null;
    }

    return (
        <div className={typeOfClass}>
            {message}
        </div>
    );
};

export default Notification;