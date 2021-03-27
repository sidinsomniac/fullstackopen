import React, { useState } from 'react';

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ];
    const points = {
        0: 0, 1: 0,
        2: 0, 3: 0,
        4: 0, 5: 0
    };

    const [selected, setSelected] = useState(0);
    const [vote, setVote] = useState({ ...points });
    const [highestVote, setHighestVote] = useState(null);

    const randomlySelect = () => {
        let arrLen = anecdotes.length;
        let randomNum = Math.floor(Math.random() * arrLen);
        if (randomNum === selected) {
            randomlySelect();
            return;
        }
        return setSelected(randomNum);
    };

    const determineMostVoted = () => {
        debugger;
        let highestIndex = 0, highestNum = 0;
        for (let v in vote) {
            if (vote[v] > highestNum) {
                highestNum = vote[v];
                highestIndex = v;
            }
        }
        setHighestVote(highestIndex);
    };

    const voteForAnecdote = () => {
        setVote({
            ...vote,
            [selected]: vote[selected] + 1
        });
        determineMostVoted();
    };

    return (
        <div>
            <div>
                <h1>Anecdote of the day</h1>
                <p>
                    {anecdotes[selected]}
                </p>
                <p>has {vote[selected]} votes</p>
                <div>
                    <button onClick={voteForAnecdote}>vote</button>
                    <button onClick={randomlySelect}>next anecdote</button>
                </div>
            </div>
            {highestVote && (
                <div>
                    <h1>Anecdote with most votes</h1>
                    <p>
                        {anecdotes[highestVote]}
                    </p>
                    <p>has {vote[highestVote]} votes</p>
                </div>
            )}
        </div>
    );
};

export default App;