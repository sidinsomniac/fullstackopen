import { initialAnecdoteState } from "../store";
import { asObject } from "../utils/store-helper";

const anecdoteReducer = (state = initialAnecdoteState, action) => {

  switch (action.type) {
    case "VOTE":
      const { id } = action.data;
      const anecdoteToChange = state.find(anecdote => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      const updatedState = state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote);
      return updatedState.sort((a, b) => b.votes - a.votes);
    case "NEW_ANECDOTE":
      const newAnecdote = action.data;
      return [...state, newAnecdote];
    default:
      return [...state];
  }
};

export const createAnecdote = anecdote => {
  return {
    type: "NEW_ANECDOTE",
    data: asObject(anecdote)
  };
};

export const increaseVoteOf = id => {
  return {
    type: "VOTE",
    data: { id }
  };
};

export default anecdoteReducer;