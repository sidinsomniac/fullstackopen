import { initialNotificationState } from "../store";

const notificationReducer = (state = initialNotificationState, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return action.message;
        case 'HIDE_NOTIFICATION':
            return '';
        default:
            return state;
    }
};

export const setNotification = (message, delay) => {
    return dispatch => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            message
        });

        setTimeout(() => {
            dispatch(hideNotification());
        }, delay);
    };
};

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    };
};

export default notificationReducer;