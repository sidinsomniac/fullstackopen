import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseVoteOf } from "../reducers/anecdoteReducer";
import { hideNotification, showNotification } from "../reducers/notificationReducer";
import anecdoteServices from "../services/anecdotes";

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filterAnecdotes }) => anecdotes.filter(anecdote => anecdote.content.trim().toLowerCase().includes(filterAnecdotes.trim().toLowerCase())));
    const dispatch = useDispatch();


    const vote = anecdote => {
        anecdoteServices.updateAnecdote(anecdote.id, anecdote);
        dispatch(increaseVoteOf(anecdote));
        dispatch(showNotification(`you voted '${anecdote.content}'`));
        setTimeout(() => {
            dispatch(hideNotification());
        }, 5000);
    };

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AnecdoteList;