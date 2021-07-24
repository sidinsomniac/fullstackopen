import userServices from "../services/users";

const usersReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_USERS":
            return action.users;
        case "REMOVE_USERS":
            return [];
        default:
            return state;
    }
};

export const setUsers = () => {
    return async dispatch => {
        const users = await userServices.getAll();
        console.log("Users 😅❤😁", users);
        dispatch({
            type: "SET_USERS",
            users
        });
    };
};

export const removeUsers = () => {
    return {
        type: "REMOVE_USERS"
    };
};

export default usersReducer;