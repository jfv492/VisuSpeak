import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js"; // Adjust the import path as necessary
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [accountType, setAccountType] = useState(localStorage.getItem("accountType"));

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsub();
  }, []);

  const updateAccountType = (type) => {
    localStorage.setItem("accountType", type);
    setAccountType(type);
  }

  return (
    <AuthContext.Provider value={{ currentUser, accountType, updateAccountType }}>
      {children}
    </AuthContext.Provider>
  );
};
