import React, { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import FilterAnecdotes from './components/FilterAnecdotes';
import Notification from './components/Notification';
import { useDispatch } from 'react-redux';
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <FilterAnecdotes />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;