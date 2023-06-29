import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Card, ICard } from '../Card';
import { Difficulty } from '.';

import './Board.scss';

interface Props {
  difficulty?: Difficulty;
  onComplete?: (res: number) => void;
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

export const Board: React.FC<Props> = ({ difficulty = Difficulty.easy, onComplete }) => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [firstChoice, setFirstChoice] = useState<ICard | null>(null);
  const [secondChoice, setSecondChoice] = useState<ICard | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [animatedCards, setAnimatedCards] = useState<number[]>([]);
  const [turns, setTurns] = useState<number>(0);

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
    if (onComplete && cards.length > 0 && cards.every(card => card.matched)) {
      setTimeout(() => onComplete(turns), 500);
    }
  }, [cards]);

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
    setTurns(prevTurns => prevTurns + 1);
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
          className={animatedCards.includes(card.id) ? '' : 'animate'}
          onAnimationEnd={() => setAnimatedCards(prevCards => [...prevCards, card.id])}
          flipped={firstChoice === card || secondChoice === card || card.matched}
          onClick={handleChoice}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
