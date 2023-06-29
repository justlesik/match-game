import React from 'react';
import { Modal } from '../Modal';
import { Button } from '../Button';

import './CompletionModal.scss';

interface Props {
  isOpen?: boolean;
  results?: number;
  onDifficultyChange?: () => void;
  onRestart?: () => void;
}

export const CompletionModal: React.FC<Props> = ({ isOpen, onDifficultyChange, onRestart, results }) => {
  return (
    <Modal isOpen={isOpen} title={<h4 className="completion-modal__title">Congatulations 🥳</h4>}>
      <div className="completion-modal__body">
        <p className="completion-modal__results">
          Well done 😉 You have completed the level in <br /> <b>{results} turns</b>
        </p>
        <div className="completion-modal__actions">
          <Button variant="primary" onClick={onDifficultyChange}>
            Back
          </Button>
          <Button variant="primary" onClick={onRestart}>
            Restart
          </Button>
        </div>
      </div>
    </Modal>
  );
};
