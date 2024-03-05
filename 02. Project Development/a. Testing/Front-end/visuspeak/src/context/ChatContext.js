import { AuthContext } from "./AuthContext.js";
import {
  createContext,
  useEffect,
  useReducer,
  useState,
  useContext,
} from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
    sortOrder: "mostRecent", // Default sort order
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      case "RESET_CHAT":
        return {
          ...state,
          user: {},
          chatId: "null",
        };
      case "CHANGE_SORT_ORDER": // New case for changing sort order
        return {
          ...state,
          sortOrder: action.payload, // Assuming payload is either 'mostRecent' or 'leastRecent'
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
