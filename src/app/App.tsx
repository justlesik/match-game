import React, { useState } from 'react';

import { Board, Difficulty } from '../components/Board';
import { DifficultyModal } from '../components/DifficultyModal';
import { Button } from '../components/Button';

import './App.scss';
import { CompletionModal } from '../components/CompletionModal/CompletionModal';

export const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState(Difficulty.hard);
  const [difficultySelection, setDifficultySelection] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [turns, setTurns] = useState(0);

  const handleCompletion = (turns: number) => {
    setTurns(turns);
    setIsCompleted(true);
  };

  const handleDifficultySelect = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
    setDifficultySelection(false);
  };

  const handleDifficultyChange = () => {
    setIsCompleted(false);
    setDifficultySelection(true);
  };

  const handleRestart = () => {
    setIsCompleted(false);
  };

  return (
    <div className="app__container">
      <DifficultyModal onSelect={handleDifficultySelect} isOpen={difficultySelection} />
      <CompletionModal
        results={turns}
        isOpen={isCompleted}
        onDifficultyChange={handleDifficultyChange}
        onRestart={handleRestart}
      />
      {!difficultySelection && !isCompleted && (
        <>
          <h4 className="app__title">Find matches</h4>
          <Button
            className="app__new-game-btn"
            variant="secondary-outline"
            onClick={() => setDifficultySelection(true)}>
            New game
          </Button>
          <Board onComplete={handleCompletion} difficulty={difficulty} />
        </>
      )}
    </div>
  );
};
