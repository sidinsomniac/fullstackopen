import React from 'react';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { hideNotification, showNotification } from "../reducers/notificationReducer";
import anecdoteServices from "../services/anecdotes";

const AnecdoteForm = () => {

    const dispatch = useDispatch();


    const addAnecdote = async e => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        e.target.anecdote.value = '';
        const newAnecdote = await anecdoteServices.createAnecdote(content);
        dispatch(createNewAnecdote(newAnecdote));
        dispatch(showNotification(`you added a new anecdote`));
        setTimeout(() => {
            dispatch(hideNotification());
        }, 5000);
    };

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input type='text' name='anecdote' />
                </div>
                <button type='submit'>create</button>
            </form>
        </>
    );
};

export default AnecdoteForm;