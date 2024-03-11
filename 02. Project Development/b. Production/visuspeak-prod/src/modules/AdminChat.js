import React, { useState, useCallback, useEffect, useContext } from "react";
import { ChatContext } from '../context/ChatContext';
import Search from "../components/chat/Search.js";
import Chats from "../components/chat/Chats.js";
import ChatHeader from "../components/chat/ChatHeader.js";
import MessageList from "../components/chat/MessageList.js";
import InputArea from "../components/chat/Input.js";
import Alert from "../components/notifications/Alert.js"
import { useTranslation } from 'react-i18next';

const AdminChat = () => {
  const { t } = useTranslation();
  const { data, dispatch } = useContext(ChatContext);
  let displayName = data.user?.displayName;
  let photo = data.user?.photoURL;
  const [leftWidth, setLeftWidth] = useState(35); // Percentage
  const [isDragging, setIsDragging] = useState(false);
  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  useEffect(() => {
    // Function to run when component unmounts
    return () => {
      // Reset selected chat here
      dispatch({ type: 'RESET_CHAT' });
    };
  }, [dispatch]);

  const startDragging = useCallback(() => {
    setIsDragging(true);
  }, []);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrag = useCallback(
    (e) => {
      if (isDragging) {
        const container = e.currentTarget.parentElement;
        const containerRect = container.getBoundingClientRect();
        const containerWidth = container.offsetWidth;
        let newLeftWidth = e.clientX - containerRect.left;

        // Enforce minimum width constraints
        const minWidth = 450; // Minimum width in pixels
        const maxLeftWidth = containerWidth - minWidth; // Max width of left panel

        if (newLeftWidth < minWidth) {
          newLeftWidth = minWidth; // Enforce minimum width on the left panel
        } else if (newLeftWidth > maxLeftWidth) {
          newLeftWidth = maxLeftWidth; // Enforce minimum width on the right panel
        }

        // Convert to percentage
        const widthPercent = (newLeftWidth / containerWidth) * 100;
        setLeftWidth(widthPercent);
      }
    },
    [isDragging]
  );

  return (

      <div className="admin-chat-container resizable-container">
        <div
          className="resizable-left-panel p-3"
          style={{ width: `${leftWidth}%` }}
        >
          <Search showAlert={showAlert}/>
          <Chats />
        </div>
        <div className="resizable-divider " onMouseDown={startDragging}>
          <i class="fa-solid fa-ellipsis-vertical fa-xl resize-icon border shadow"></i>
        </div>
        <div
          className="resizable-right-panel p-3"
          style={{ width: `${100 - leftWidth}%` }}
        >
          <Alert alert={alert} />
          {displayName ? (
        <>
          <ChatHeader user={displayName} photo={photo} />

          <MessageList />
          <div class="chat-input-container">
            <InputArea />
          </div>
        </>
      ) : (
        <div class="centered-text lead p-3">
          {t('ChatPlaceholder')}
        </div>
      )}
        </div>
        {isDragging && (
          <div
            className="resizable-dragging-overlay"
            onMouseMove={onDrag}
            onMouseUp={stopDragging}
          />
        )}
      </div>

  );
};

export default AdminChat;
