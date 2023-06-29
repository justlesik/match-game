import React from 'react';
import { Modal } from '../Modal';
import { Button } from '../Button';

import { difficulties, Difficulty } from '../../constants/difficulties.constant';

import './DifficultyModal.scss';

interface Props {
  isOpen?: boolean;
  onSelect: (difficulty: Difficulty) => void;
}

export const DifficultyModal: React.FC<Props> = ({ isOpen, onSelect }) => (
  <Modal title={<h4 className="difficulty-modal__title">Select difficulty 🤔</h4>} isOpen={isOpen}>
    <div className="difficulty-modal__body">
      {Object.values(difficulties).map(difficulty => (
        <Button key={difficulty} variant="primary" onClick={() => onSelect(difficulty)}>
          {difficulty}
        </Button>
      ))}
    </div>
  </Modal>
);
