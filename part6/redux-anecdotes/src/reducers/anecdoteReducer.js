import anecdoteServices from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      const { id } = action.data;
      const anecdoteToChange = state.find(anecdote => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      const updatedState = state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote);
      return updatedState.sort((a, b) => b.votes - a.votes);
    case 'NEW_ANECDOTE':
      const newAnecdote = action.data;
      return [...state, newAnecdote];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return [...state];
  }
};

export const createNewAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteServices.createAnecdote(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    });
  };
};

export const increaseVoteOf = anecdote => {
  return async dispatch => {
    const response = await anecdoteServices.updateAnecdote(anecdote);
    dispatch({
      type: 'VOTE',
      data: { id: response.id }
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};

export default anecdoteReducer;