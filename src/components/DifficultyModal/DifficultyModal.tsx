import React from 'react';
import { Modal } from '../Modal';
import { Button } from '../Button';
import { Difficulty } from '../Board';

import './DifficultyModal.scss';

interface Props {
  isOpen?: boolean;
  onSelect: (difficulty: Difficulty) => void;
}

export const DifficultyModal: React.FC<Props> = ({ isOpen, onSelect }) => {
  return (
    <Modal title={<h4 className="difficulty-modal__title">Select difficulty 🤔</h4>} isOpen={isOpen}>
      <div className="difficulty-modal__body">
        <Button variant="primary" onClick={() => onSelect(Difficulty.easy)}>
          {Difficulty.easy} 😎
        </Button>
        <Button variant="primary" onClick={() => onSelect(Difficulty.normal)}>
          {Difficulty.normal} 🙂
        </Button>
        <Button variant="primary" onClick={() => onSelect(Difficulty.hard)}>
          {Difficulty.hard} 🤬
        </Button>
      </div>
    </Modal>
  );
};
