const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER_ANECDOTES':
            return action.filterText;
        default:
            return state;
    }
};

export const filterAnecdotes = val => ({
    type: 'FILTER_ANECDOTES',
    filterText: val
});

export default filterReducer;