import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { hideNotification, showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {

    const dispatch = useDispatch();


    const addAnecdote = e => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        e.target.anecdote.value = '';
        dispatch(createAnecdote(content));
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