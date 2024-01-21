import React, { useState } from 'react';

function InputArea({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendClick = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage(''); // Clear the input after sending
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  return (
    <div className="input-area hero px-4 py-5 text-center">
      <div className="text-center container mb-5">
      <div class="row">
        <div class="col">
          
        </div>
        <div class="col-6">
        <div class="input-group mb-3">
      <input
        className="form-control"
        type="text"
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your message here..."
      />
        <button onClick={handleSendClick}>Send</button>
      </div>
        </div>
        <div class="col">
          
        </div>
      </div>
      
      </div>
      
    </div>
  );
}

export default InputArea;
