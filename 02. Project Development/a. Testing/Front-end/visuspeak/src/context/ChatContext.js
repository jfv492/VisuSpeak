import { AuthContext } from "./AuthContext.js";
import {
  createContext,
  useReducer,
  useContext,
} from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
    sortOrder: "mostRecent",
    showArchived: false,
    userTypes: ["admin", "guest"],
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          ...state,
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      case "SET_CHAT":
          return {
            ...state,
            user: action.payload,
            chatId:
              currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid,
          };
      case "RESET_CHAT":
        return {
          ...INITIAL_STATE,
        };
      case "CHANGE_SORT_ORDER":
        return {
          ...state,
          sortOrder: action.payload,
        };
      case "TOGGLE_SHOW_ARCHIVED":
        return {
          ...state,
          showArchived: !state.showArchived,
        };
        case "TOGGLE_USER_TYPE":
          const newUserTypes = new Set(state.userTypes);
          if (newUserTypes.has(action.payload)) {
            newUserTypes.delete(action.payload);
          } else {
            newUserTypes.add(action.payload);
          }
          return {
            ...state,
            userTypes: Array.from(newUserTypes),
          };        
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  const toggleShowArchived = () => {
    dispatch({ type: "TOGGLE_SHOW_ARCHIVED" });
  };
  return (
    <ChatContext.Provider value={{ data: state, dispatch, toggleShowArchived }}>
      {children}
    </ChatContext.Provider>
  );
};
