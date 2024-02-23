import "./App.css";
import "./Mobile.css";
import "./User.css";

import Login from "./modules/Login.js";
import SignUp from "./modules/SignUp.js";
import Footer from "./modules/Footer.js";
import Navbar from "./modules/Navbar.js";
import Home from "./modules/LandingPage.js";
import About from "./modules/About.js";
import HomeMenu from "./modules/HomeMenu.js";
import ASLChat from "./modules/ASLChat.js";


import Alert from "./components/Alert.js";

import NewChat from "./components/chat/ChatContainer.js";

import Resources from "./modules/Resources.js";

import TranscriptHistory from "./modules/TranscriptHistory.js";
import SpeechTest from "./components/SpeechTest.js";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AccountSettings from "./user/AccountSettings.js";


function App() {
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
              <Route exact path="/chat" element={<HomeMenu />} />
              <Route
                exact
                path="/aslchat"
                element={<ASLChat showAlert={showAlert} />}
              />

              <Route exact path="/resources" element={<Resources />} />
              <Route exact path="/newchat" element={<NewChat />} />

              <Route exact path="/history" element={<TranscriptHistory />} />
              <Route exact path="/speechtest" element={<SpeechTest />} />

              <Route exact path="/settings" element={<AccountSettings />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
