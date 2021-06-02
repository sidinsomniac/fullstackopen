import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import anecdoteReducer from './reducers/anecdoteReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
});
const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);