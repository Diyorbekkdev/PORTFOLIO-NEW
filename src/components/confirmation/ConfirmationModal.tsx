
import React from 'react';

import './conformation.scss';
interface ConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" >
      <div className="modal">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this skill?</p>
        
        <div className="modal-actions">
          <button className='cancel_confirm' onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
