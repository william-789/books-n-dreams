import React from 'react';

const Modal = ({ onCloseEl, onClose, id, children }) => {
  const closeModal = (event) => {
    // Prevents closure when clicking the Modal Content
    if (event.target.id === id) {
      onClose();
    }
  };

  return (
    <div className="Modal modal-overlay" onClick={closeModal} id={id}>
      <div className="modal-content">
        {onCloseEl({ onClose })}
        {children}
      </div>
    </div>
  );
};

export default Modal;
