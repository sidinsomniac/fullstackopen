import { initialNotificationState } from "../store";

const notificationReducer = (state = initialNotificationState, action) => {
    switch (action.type) {
        case 'SUCCESS':
            return initialNotificationState;
        case 'ERROR':
            return 'SOME ERROR OCCURED';
        default:
            return state;
    }
};

export default notificationReducer;