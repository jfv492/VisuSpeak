import "./App.css";
import "./Mobile.css";

import Login from "./modules/Login.js";
import SignUp from "./modules/SignUp.js";
import Footer from "./modules/Footer.js";
import Navbar from "./modules/Navbar.js";
import Home from "./modules/Home.js";
import About from "./modules/About.js";


import Alert from "./components/Alert.js";
import Chat from "./components/Chat.js";
import NewChat from "./components/ChatContainer.js";

import Resources from "./components/Resources.js";
import ASLChat from "./components/ASLChat.js";
import TranscriptHistory from "./components/TranscriptHistory.js";
import SpeechTest from "./components/SpeechTest.js";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <>
      <BrowserRouter>
        <div className="page-container">
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
            <Route exact path="/about" element={<About heading="About Us"/>} />

            <Route exact path="/chat" element={<Chat />} />
            
            <Route exact path="/resources" element={<Resources />} />
            <Route exact path="/newchat" element={<NewChat />} />
            <Route
              exact
              path="/aslchat"
              element={<ASLChat showAlert={showAlert} />}
            />
            <Route exact path="/history" element={<TranscriptHistory />} />
            <Route exact path="/speechtest" element={<SpeechTest />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
