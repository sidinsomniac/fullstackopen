import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseVoteOf } from "../reducers/anecdoteReducer";
import { hideNotification, showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filteredAnecdotes }) => anecdotes.filter(anecdote => anecdote.content.trim().toLowerCase().includes(filteredAnecdotes.trim().toLowerCase())));
    const dispatch = useDispatch();
    const [timer, setTimer] = useState('');

    useEffect(() => {
        return () => {
            clearTimeout(timer);
        };
    });

    const vote = ({ id, content }) => {
        dispatch(increaseVoteOf(id));
        dispatch(showNotification(`you voted '${content}'`));
        let timeoutTimer = setTimeout(() => {
            dispatch(hideNotification());
        }, 3000);
        setTimer(timeoutTimer);
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