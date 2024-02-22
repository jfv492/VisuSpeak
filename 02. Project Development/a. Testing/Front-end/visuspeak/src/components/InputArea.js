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
    <div className="input-area text-center px-2">
      <div class="input-group border rounded shadow rounded-4">
        <span class="input-group-text microphone-icon">
          {listening ? (
            <i
              onClick={stop}
              className="fa-solid fa-microphone-slash fa-xl "
            ></i>
          ) : (
            <i
              onClick={listen}
              className="fa-solid fa-microphone fa-xl"
            ></i>
          )}
        </span>
        <textarea
          type="text"
          placeholder="Your message..."
          class="form-control chat-input"
          id="autoExpandingTextarea"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          style={{ height: textareaHeight }}
          onInput={handleHeightAdjustment}
        ></textarea>
        <span class="input-group-text">
          <button class="send-button py-2 rounded-2" onClick={handleSendClick}>
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </span>
      </div>
    </div>
  );
}

export default InputArea;
