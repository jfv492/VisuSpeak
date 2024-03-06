import React, { useContext, useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import { AuthContext } from "../../context/AuthContext.js";
import { ChatContext } from "../../context/ChatContext.js";
import {
  Timestamp,
  serverTimestamp,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { doc } from "firebase/firestore";
import { db } from "../../firebase.js";
import modelChatUrl from "../../Chat-env.js";

const Input = ({ onSendMessage, isFetchingEnabled, fetchInterval, immediateWord, onImmediateSend }) => {
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  // const [message, setMessage] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [lastFetchedWord, setLastFetchedWord] = useState("");
  const [isHandDetected, setIsHandDetected] = useState(true);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (immediateWord) {
      setText((prev) => prev + " " + immediateWord);
      // handleSend(); // You might adjust handleSend to optionally skip clearing the text if you wish
      onImmediateSend(); // Call this to indicate the immediate send operation is complete
    }
  }, [immediateWord, onImmediateSend]);

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setText(result);
    },
    onEnd: () => {
      setIsListening(false);
    },
  });

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = async () => {
    // Prevent sending if text is empty or only contains whitespace
    if (!text.trim()) {
      return;
    }

    // Check if chatId is valid
    if (!data.chatId || data.chatId === "null") {
      console.error("No chat selected");
      // You can also set an error message state and display it to the user
      return;
    }

    let lastSenderName =
      currentUser.displayName || localStorage.getItem("username");

    try {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          senderDisplayName: lastSenderName,
          date: Timestamp.now(),
        }),
      });
      setText(""); // Clear the input field after sending the message
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle the error appropriately
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".lastSender"]: {
        lastSenderName,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".lastSender"]: {
        lastSenderName,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
  };

  useEffect(() => {
    let interval;
    if (isFetchingEnabled) {
      interval = setInterval(() => {
        fetch(`${modelChatUrl}/getword`)
          .then((response) => response.json())
          .then((data) => {
            if (data.word && data.word !== lastFetchedWord) {
              setLastFetchedWord(data.word);
              setText((prev) => prev + " " + data.word);
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
    <div className="input-area text-center shadow">
      <div class="input-group border shadow rounded-3">
        <span class="input-group-text input-icon">
          {listening ? (
            <i
              onClick={stop}
              className="fa-solid fa-microphone-slash fa-xl"
            ></i>
          ) : (
            <i onClick={listen} className="fa-solid fa-microphone fa-xl"></i>
          )}
        </span>
        <textarea
          type="text"
          placeholder="Your message..."
          class="form-control chat-input"
          id="autoExpandingTextarea"
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          value={text}
          style={{ height: "80px" }}
        ></textarea>
        <span class="input-group-text input-icon">
          <button class="send-button py-2 " onClick={handleSend}>
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </span>
      </div>
    </div>
  );
};

export default Input;
