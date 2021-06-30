import React from 'react';
import { useSelector } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import FilterAnecdotes from "./components/FilterAnecdotes";
import Notification from "./components/Notification";

const App = () => {
  const notification = useSelector(state => state.notification);
  return (<div>
    {notification && <Notification />}
    <h2>Anecdotes</h2>
    <FilterAnecdotes />
    <AnecdoteList />
    <AnecdoteForm />
  </div>);
};

export default App;