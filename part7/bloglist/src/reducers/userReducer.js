const userReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_USER":
            return action.user;
        case "REMOVE_USER":
            return null;
        default:
            return state;
    }
};

export const setUser = user => {
    return {
        type: "SET_USER",
        user
    };
};

export const removeUser = () => {
    return {
        type: "REMOVE_USER"
    };
};

export default userReducer;