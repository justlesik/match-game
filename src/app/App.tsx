import React, { useState } from 'react';

import { Board, Difficulty } from '../components/Board';

import './App.scss';

export const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState(Difficulty.easy);
  return (
    <div className="container">
      <h1>Find mathes</h1>
      <div>
        <button onClick={() => setDifficulty(Difficulty.easy)}>Easy</button>
        <button onClick={() => setDifficulty(Difficulty.normal)}>Normal</button>
        <button onClick={() => setDifficulty(Difficulty.hard)}>Hard</button>
      </div>
      <Board difficulty={difficulty} />
    </div>
  );
};
