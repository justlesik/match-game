import React from 'react';
import classNames from 'classnames';

import { CardSet } from '../../constants/cardSets.constant';

import './Card.scss';

interface Props {
  flipped?: boolean;
  disabled?: boolean;
  card: CardSet;
  className?: string;
  onAnimationEnd?: React.AnimationEventHandler<HTMLDivElement>;
  onClick: (card: CardSet) => void;
}

export const Card: React.FC<Props> = ({ flipped, disabled, onClick, card, className, onAnimationEnd }) => {
  const classes = classNames('card', { 'card--flipped': flipped }, className);

  const handleClick = () => {
    if (disabled) return;
    onClick(card);
  };

  return (
    <div className={classes} onAnimationEnd={onAnimationEnd}>
      <div className="front-face">{card.name}</div>
      <div className="back-face" onClick={handleClick}>
        🐾
      </div>
    </div>
  );
};
