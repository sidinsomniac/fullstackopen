const initialNotifications = {
    successMessage: "",
    errorMessage: ""
};

const notificationReducer = (state = initialNotifications, action) => {
    switch (action.type) {
        case "SUCCESS_MESSAGE":
            return {
                successMessage: action.successMessage,
                errorMessage: ""
            };
        case "FAILURE_MESSAGE":
            return {
                successMessage: "",
                errorMessage: action.errorMessage
            };
        case "CLEAR_MESSAGE":
            return { ...initialNotifications };
        default:
            return state;
    }
};

export const getAndSetSuccess = message => {
    return {
        type: "SUCCESS_MESSAGE",
        successMessage: message
    };
};

export const getAndSetError = message => {
    return {
        type: "FAILURE_MESSAGE",
        errorMessage: message
    };
};

export const clearMessage = timeout => {
    return dispatch => {
        setTimeout(() => {
            dispatch({
                type: "CLEAR_MESSAGE"
            });
        }, timeout);
    };
};

export default notificationReducer;