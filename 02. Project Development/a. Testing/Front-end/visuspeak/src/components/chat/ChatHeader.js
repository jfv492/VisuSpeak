import React, { useContext, useState, useEffect } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../context/AuthContext.js";
import { ChatContext } from "../../context/ChatContext.js";
import { updateDoc, getDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../firebase.js";
import ChatAlert from "../ChatAlert";
import ChatActions from "./ChatActions.js";
import defaultProfilePicture from "../../assets/images/AccountSettingsHeadshot.jpg";

const ChatHeader = (props) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [alert, setAlert] = useState(null);
  const [isArchived, setIsArchived] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const fetchIsArchiveStatus = async (currentUser, otherUserId) => {
    // Assuming currentUser and otherUserId are available
    const combinedId =
      currentUser > otherUserId
        ? currentUser + otherUserId
        : otherUserId + currentUser;
    
    // The document reference
    const docRef = doc(db, "userChats", currentUser);
    
    // Variable to store the isArchive status
    let isArchiveStatus;
    
    try {
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Access the isArchive field from the document
        isArchiveStatus = docSnap.data()[combinedId]?.isArchive;
  
        console.log("isArchive status: ", isArchiveStatus);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  
    // Return the isArchive status
    return isArchiveStatus;
  };

  const handleClick = async () => {
    if (!data.chatId || data.chatId === "null") {
      console.error("No chat selected");
      return;
    }
  
    const status = await fetchIsArchiveStatus(currentUser.uid, data.user.uid);
    setIsArchived(status); // Update the state for future renders, but don't rely on it immediately.
  
    // Use `status` directly for your update logic, since it reflects the current fetched state.
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [`${data.chatId}.isArchive`]: !status,
    });
  
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [`${data.chatId}.isArchive`]: !status,
    });
  
    // Optionally, you might want to update the state to reflect the change immediately.
    // This is useful if the UI needs to react to this state change right away.
    setIsArchived(!status);
  };
  return (
    <div class="messages-heading row mb-1 z-3 position-relative ">
      <div class="">
        <div className="chat-header rounded-3 bg-gradient shadow">
          <div className="user-info col-sm-8">
            <img
              src={props.photo || defaultProfilePicture}
              alt="User"
              className="rounded-circle me-2 shadow"
              style={{ width: "50px", objectFit: "cover" }}
            />

            <h4 className="user-name chat-name-ellipsis">{props.user}</h4>
            {localStorage.getItem("accountType") === "admin" && <div>
            <button
              class="btn chat-action-button bg-gradient mx-2"
              type="button"
              aria-expanded="false"
              onClick={handleClick}
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              <i class="fa-solid fa-box-archive"></i>
            </button>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography sx={{ p: 1 }}>Archive Chat</Typography>
            </Popover>
            </div>}
          </div>
          <ChatAlert alert={alert} />
          <ChatActions showAlert={showAlert} />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
