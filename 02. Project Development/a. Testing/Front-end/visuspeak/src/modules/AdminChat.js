import React, { useState, useCallback } from "react";

import Search from "../components/chat/Search.js";
import Chats from "../components/chat/Chats.js";
import Chat from "../components/chat/Chat.js";

const AdminChat = (props) => {
  const [leftWidth, setLeftWidth] = useState(35); // Percentage
  const [isDragging, setIsDragging] = useState(false);

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
        {/* <div className="row text-begin align-items-center">
          <div className="col-sm-4">
            <h3> {props.heading}</h3>
          </div>
          <div className="col-sm-8"></div>
        </div> */}

        <div
          className="resizable-left-panel p-3"
          style={{ width: `${leftWidth}%` }}
        >
          <Search />
          <Chats />
        </div>
        <div className="resizable-divider " onMouseDown={startDragging}>
          <i class="fa-solid fa-ellipsis-vertical fa-xl resize-icon border shadow"></i>
        </div>
        <div
          className="resizable-right-panel p-3"
          style={{ width: `${100 - leftWidth}%` }}
        >
          <Chat />
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
