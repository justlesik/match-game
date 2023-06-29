import React from 'react';
import classNames from 'classnames';

import type { ICard } from '.';

import './Card.scss';

interface Props {
  flipped?: boolean;
  disabled?: boolean;
  card: ICard;
  className?: string;
  onAnimationEnd?: React.AnimationEventHandler<HTMLDivElement>;
  onClick: (card: ICard) => void;
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
