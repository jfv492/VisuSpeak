import React from 'react';

function ActionBar({ onOpenMic, onToggleKeyboard, onOpenCamera, onCloseCamera }) {
  return (
    <div className="action-bar">
      <button onClick={onOpenMic}>Open Mic</button>
      <button onClick={onToggleKeyboard}>Keyboard</button>
      <button onClick={onOpenCamera}>Open Camera</button>
      <button onClick={onCloseCamera}>Close Camera</button>
    </div>
  );
}

export default ActionBar;
