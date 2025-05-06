import React from 'react';
import './ImageModal.css'
const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="image-modal-overlay">
      <div className="image-modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <img src={imageUrl} alt="Full size complaint" />
      </div>
    </div>
  );
};

export default ImageModal;