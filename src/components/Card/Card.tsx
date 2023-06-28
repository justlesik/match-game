import React from 'react';
import classNames from 'classnames';

import type { ICard } from '.';

import './Card.scss';

interface Props {
  flipped?: boolean;
  disabled?: boolean;
  onClick: (card: ICard) => void;
  card: ICard;
}

export const Card: React.FC<Props> = ({ flipped, disabled, onClick, card }) => {
  const classes = classNames('card', { 'card--flipped': flipped });

  const handleClick = () => {
    if (disabled) return;
    onClick(card);
  };

  return (
    <div className={classes}>
      <div className="front-face">{card.name}</div>
      <div className="back-face" onClick={handleClick}>
        🐾
      </div>
    </div>
  );
};
