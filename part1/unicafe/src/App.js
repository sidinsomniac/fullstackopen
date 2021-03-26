import React, { useState } from 'react';
import './App.css';
import Statistics from "./Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div className="feedback">
      <div>
        <h1>give feedback</h1>
        <div>
          <button>good</button>
          <button>neutral</button>
          <button>bad</button>
        </div>
      </div>
      <Statistics />
    </div>
  );
};

export default App;