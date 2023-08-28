
import React from 'react';

import './conformation.scss';
interface ConfirmationModalProps {
  isOpen: boolean;
  deleteTitle: string;
  deleteMessage: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onCancel, onConfirm, deleteTitle, deleteMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" >
      <div className="modal">
        <h2>{deleteTitle}</h2>
        <p>{deleteMessage}</p>
        
        <div className="modal-actions">
          <button className='cancel_confirm' onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
