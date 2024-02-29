import "./App.css";
import "./Mobile.css";
import "./User.css";

import Alert from "./components/Alert.js";
import Login from "./modules/Login.js";
import SignUp from "./modules/SignUp.js";
import Footer from "./modules/Footer.js";
import Navbar from "./modules/Navbar.js";
import Home from "./modules/Home.js";
import About from "./modules/About.js";
import AdminChat from "./modules/AdminChat.js";
import ASLChat from "./modules/ASLChat.js";
import AccountSettings from "./modules/AccountSettings.js";


import Resources from "./modules/Resources.js";

import TranscriptHistory from "./modules/TranscriptHistory.js";

import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import { AuthContext } from "./context/AuthContext.js";
import { refreshUserOnlineStatus } from "./utils/UserPresence.js"


function App() {
  const {currentUser} = useContext(AuthContext)
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 8000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentUser?.uid) {
        refreshUserOnlineStatus(currentUser.uid);
      }
    }, 60000); // refresh status every 60 seconds
  
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [currentUser?.uid]);

  return (
    <>
      <BrowserRouter>
        <div className="page-container">
          <div className="content-wrap">
            <Navbar />
            <Alert alert={alert} />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                exact
                path="/login"
                element={<Login heading="Login" showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<SignUp heading="Sign Up" showAlert={showAlert} />}
              />
              <Route
                exact
                path="/about"
                element={<About heading="About Us" />}
              />
              <Route exact path="/adminchat" element={<AdminChat heading="Previous Chat Sessions"/>} />
              
              <Route
                exact
                path="/aslchat"
                element={<ASLChat showAlert={showAlert} />}
              />
              
              <Route exact path="/resources" element={<Resources />} />

              <Route exact path="/history" element={<TranscriptHistory />} />

              <Route exact path="/accountsettings" element={<AccountSettings />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
