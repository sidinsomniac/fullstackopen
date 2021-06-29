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

export const showNotification = message => {
    return {
        type: 'SHOW_NOTIFICATION',
        message
    };
};

export const hideNotification = timeout => {
    return dispatch => {
        setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION'
            });
        }, timeout);
    };
};

export default notificationReducer;