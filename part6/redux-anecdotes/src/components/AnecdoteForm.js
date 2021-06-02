import React from 'react';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {

    const dispatch = useDispatch();


    const addAnecdote = async e => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        e.target.anecdote.value = '';
        dispatch(createNewAnecdote(content));
        dispatch(setNotification(`you added a new anecdote`), 5000);
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