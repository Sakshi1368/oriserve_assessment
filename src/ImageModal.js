// ImageModal.js
import React from 'react';

function ImageModal({ image, onClose }) {
  return (
    <div className="image-modal">
      <img src={image.url} alt={image.title} />
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ImageModal;
