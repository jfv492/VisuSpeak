import React, { useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";

function InputArea({ onSendMessage, isFetchingEnabled, fetchInterval }) {
  const [message, setMessage] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [lastFetchedWord, setLastFetchedWord] = useState("");
  const [isHandDetected, setIsHandDetected] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const maxHeight = 100;

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setMessage(result);
    },
    onEnd: () => {
      setIsListening(false);
    },
  });

  const handleInputChange = (e) => {
    setTextareaHeight("auto");
    setMessage(e.target.value);
  };

  const handleSendClick = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
      setTextareaHeight("auto");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendClick();
    }
  };
  const handleHeightAdjustment = (event) => {
    const element = event.target;
    if (element.scrollHeight > maxHeight) {
      element.style.height = `${maxHeight}px`;
      element.style.overflowY = "scroll";
    } else {
      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
      element.style.overflowY = "hidden";
    }
  };

  useEffect(() => {
    let interval;
    if (isFetchingEnabled) {
      interval = setInterval(() => {
        fetch("http://localhost:3002/getword")
          .then((response) => response.json())
          .then((data) => {
            if (data.word && data.word !== lastFetchedWord) {
              setLastFetchedWord(data.word);
              setMessage((prev) => prev + " " + data.word);
              setIsHandDetected(true);
            } else {
              setIsHandDetected(false);
            }
          })
          .catch((error) => {
            console.error("Error fetching word:", error);
            setIsHandDetected(false);
          });
      }, fetchInterval);
    }

    return () => clearInterval(interval);
  }, [isFetchingEnabled, fetchInterval, lastFetchedWord]);

  useEffect(() => {
    return () => {
      if (listening) {
        stop();
      }
    };
  }, [listening, stop]);

  return (
    <div className="input-area text-center pb-2">
      <div className="text-center container mt-4">
        <div class="row">
          <div class="col">
            <div class="hand-detected-alert justify-content-center mb-2">
              <span class="badge text-bg-danger">
                {!isHandDetected && `Error fetching predictions`}
              </span>
            </div>
            <div class=" chat-input-area">
              <div class="icon-container" style={{ flexShrink: 0 }}>
                {listening ? (
                  <span onClick={stop}>
                    <i className="fa-solid fa-microphone-slash microphone-icon"></i>
                  </span>
                ) : (
                  <span onClick={listen}>
                    <i className="fa-solid fa-microphone microphone-icon"></i>
                  </span>
                )}
              </div>
              <textarea
                type="text"
                placeholder="Your message..."
                class="chat-input"
                id="autoExpandingTextarea"
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                style={{ height: textareaHeight }}
                onInput={handleHeightAdjustment}
              ></textarea>
              <button
                class="send-button py-2 rounded-2"
                onClick={handleSendClick}
              >
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputArea;
