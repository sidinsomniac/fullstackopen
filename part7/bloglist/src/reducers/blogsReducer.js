import blogServices from "../services/blogs";

const blogsReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_BLOGS":
            return action.payload;
        default:
            return state;
    }
};

export const fetchAndSetBlogs = () => {
    return async dispatch => {
        const blogs = await blogServices.getAll();
        dispatch({
            type: "SET_BLOGS",
            payload: blogs
        });
    };
};

export default blogsReducer;