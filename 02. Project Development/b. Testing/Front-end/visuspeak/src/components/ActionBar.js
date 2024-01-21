import React from 'react';
import "../App.css"

function ActionBar({ onOpenMic, onToggleKeyboard, onOpenCamera, onCloseCamera }) {
    // Define the function to open the camera link
  const handleOpenCamera = () => {
    window.open("http://localhost:3001/", "_blank");
  };

  return (
    <div className="action-bar">
      <div className="d-grid gap-4 d-sm-flex justify-content-sm-center align-items-center my-5">
      <button 
        onClick={onOpenMic} 
        className="btn button-style btn-lg button-outline-style" 
        tabIndex="2"
      >
        Open Mic
      </button>

      <button 
        onClick={onToggleKeyboard} 
        className="btn button-style btn-lg button-outline-style" 
        tabIndex="2"
      >
        Keyboard
      </button>

      <button 
        onClick={onOpenCamera} 
        className="btn button-style btn-lg button-outline-style camera-button" 
        tabIndex="2"
      >
        Open Camera
      </button>

      <button 
        onClick={onCloseCamera} 
        className="btn button-style btn-lg button-outline-style camera-button" 
        tabIndex="2"
      >
        Close Camera
      </button>
    </div>

    </div>
  );
}

export default ActionBar;
