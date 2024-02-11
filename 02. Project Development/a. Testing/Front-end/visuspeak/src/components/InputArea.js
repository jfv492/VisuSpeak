import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:3002/getword')
        .then(response => response.json())
        .then(data => {
          if (data.word) {
            setMessage(prev => prev + ' ' + data.word);
          }
        });
    }, 5000); // Fetch every 5 seconds
  
    return () => clearInterval(interval);
  }, []);

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
        <button className="btn button-style btn button-outline-style" onClick={handleSendClick}>Send</button>
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
