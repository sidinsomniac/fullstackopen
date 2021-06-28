import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { connect } from 'react-redux';
import { hideNotification, showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ createAnecdote, showNotification, hideNotification }) => {

    const addAnecdote = e => {
        e.preventDefault();
        const content = e.target.anecdote.value;
        e.target.anecdote.value = '';
        createAnecdote(content)
        showNotification(`you added a new anecdote`)
        setTimeout(() => {
            hideNotification()
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

const mapDispatchToProps = {
    createAnecdote,
    showNotification,
    hideNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm);