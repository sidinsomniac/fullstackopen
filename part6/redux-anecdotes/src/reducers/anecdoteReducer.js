const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {

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
      console.log({ state }, newAnecdote);
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