// import { initialAnecdoteState } from '../store';
import { asObject } from '../utils/store-helper';

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

export const createNewAnecdote = anecdote => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote
  };
};

export const increaseVoteOf = id => {
  return {
    type: 'VOTE',
    data: { id }
  };
};

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  };
};

export default anecdoteReducer;