import React, { useState } from 'react';

import { Board } from '../components/Board';
import { Button } from '../components/Button';
import { DifficultyModal } from '../components/DifficultyModal';
import { CompletionModal } from '../components/CompletionModal/CompletionModal';

import { Difficulty } from '../constants/difficulties.constant';

import './App.scss';

export const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [difficultySelection, setDifficultySelection] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [turns, setTurns] = useState<number>(0);

  const showBoard = !difficultySelection && !isCompleted;

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
      {showBoard && (
        <>
          <h4 className="app__title">Find matches</h4>
          <Button
            className="app__new-game-btn"
            variant="secondary-outline"
            onClick={() => setDifficultySelection(true)}>
            New game
          </Button>
          <Board onCompletion={handleCompletion} difficulty={difficulty} />
        </>
      )}
    </div>
  );
};
