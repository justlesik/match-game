import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Card, ICard } from '../Card';
import { Difficulty } from '.';

import './Board.scss';

interface Props {
  difficulty?: Difficulty;
}

const cardSources = [
  { name: '🐶', matched: false },
  { name: '🐱', matched: false },
  { name: '🐭', matched: false },
  { name: '🐹', matched: false },
  { name: '🐰', matched: false },
  { name: '🦊', matched: false },
  { name: '🐻', matched: false },
  { name: '🐼', matched: false },
  { name: '🐯', matched: false },
  { name: '🦁', matched: false },
];

export const Board: React.FC<Props> = ({ difficulty = Difficulty.easy }) => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [firstChoice, setFirstChoice] = useState<ICard | null>(null);
  const [secondChoice, setSecondChoice] = useState<ICard | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  const classes = classNames('board', `board--${difficulty}`);

  const getCardsByDifficulty = () => {
    const difficultyMap = {
      [Difficulty.easy]: 3,
      [Difficulty.normal]: 6,
      [Difficulty.hard]: 10,
    };

    return cardSources.slice(0, difficultyMap[difficulty]);
  };

  useEffect(() => {
    resetTurn();
    shuffleCards();
  }, [difficulty]);

  const shuffleCards = () => {
    if (disabled) return;
    const shuffledCards = [...getCardsByDifficulty(), ...getCardsByDifficulty()]
      .map(card => ({ ...card, id: Math.random().toString() }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards as any);
  };

  const handleChoice = (card: any) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  useEffect(() => {
    if (!firstChoice || !secondChoice) return;
    setDisabled(true);
    if (firstChoice.name === secondChoice.name) {
      setCards(prevCards =>
        prevCards.map(card => (card.name === firstChoice.name ? { ...card, matched: true } : card))
      );
      resetTurn();
    } else {
      setTimeout(resetTurn, 1000);
    }
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className={classes}>
      {cards.map(card => (
        <Card
          key={card.id}
          card={card}
          flipped={firstChoice === card || secondChoice === card || card.matched}
          onClick={handleChoice}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
