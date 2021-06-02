import { asObject } from "./utils/store-helper";
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import anecdoteReducer from './reducers/anecdoteReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";


const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

export const initialNotificationState = "";

export const initialAnecdoteState = anecdotesAtStart.map(asObject);

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filterAnecdotes: filterReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;