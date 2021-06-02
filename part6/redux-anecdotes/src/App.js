import React from 'react';
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import FilterAnecdotes from "./components/FilterAnecdotes";
import Notification from "./components/Notification";

const App = () => (
  <div>
    <Notification />
    <h2>Anecdotes</h2>
    <FilterAnecdotes />
    <AnecdoteList />
    <AnecdoteForm />
  </div>
);

export default App;