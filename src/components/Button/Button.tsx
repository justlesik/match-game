import React from 'react';
import classNames from 'classnames';

import './Button.scss';

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline';
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<Props> = ({ children, onClick, disabled, variant = 'primary-outline', className }) => {
  const classes = classNames('button', `button--${variant}`, className);

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
