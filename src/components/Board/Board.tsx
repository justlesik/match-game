import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Card } from '../Card';

import { CardSet, animals } from '../../constants/cardSets.constant';
import { Difficulty } from '../../constants/difficulties.constant';

import { getCardsByDifficulty } from '../../utils/difficulty.util';

import './Board.scss';

interface Props {
  difficulty?: Difficulty;
  onCompletion?: (turns: number) => void;
}

export const Board: React.FC<Props> = ({ difficulty = 'easy', onCompletion }) => {
  const [cards, setCards] = useState<CardSet[]>([]);
  const [firstChoice, setFirstChoice] = useState<CardSet | null>(null);
  const [secondChoice, setSecondChoice] = useState<CardSet | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [animatedCards, setAnimatedCards] = useState<number[]>([]);
  const [turns, setTurns] = useState<number>(0);

  const classes = classNames('board', `board--${difficulty}`);

  const slicedCards = getCardsByDifficulty(animals, difficulty);

  useEffect(() => {
    if (onCompletion && cards.length > 0 && cards.every(card => card.matched)) {
      setTimeout(() => onCompletion(turns), 500);
    }
  }, [cards, onCompletion, turns]);

  const shuffleCards = () => {
    if (disabled) return;
    const shuffledCards = [...slicedCards, ...slicedCards]
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
  }, [difficulty]);

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
