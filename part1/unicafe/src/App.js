import React, { useState } from 'react';
import './App.css';
import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setGoodVal = () => {
    setGood(good + 1);
  };

  const setNeutralVal = () => {
    setNeutral(neutral + 1);
  };

  const setBadVal = () => {
    setBad(bad + 1);
  };


  return (
    <div className="feedback">
      <div>
        <h1>give feedback</h1>
        <div>
          <Button text={'good'} handleClick={setGoodVal} />
          <Button text={'neutral'} handleClick={setNeutralVal} />
          <Button text={'bad'} handleClick={setBadVal} />
        </div>
      </div>
      <Statistics feedBack={{ good, neutral, bad }} />
    </div>
  );
};

export default App;