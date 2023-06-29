import React from 'react';
import { createPortal } from 'react-dom';

import './Modal.scss';

interface Props {
  isOpen?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ isOpen, title, children, footer }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal">
      {title && <header className="modal__header">{title}</header>}
      {children && <main className="modal__body">{children}</main>}
      {footer && <footer className="modal__footer">{footer}</footer>}
    </div>,
    document.getElementById('modal') as HTMLElement
  );
};
