import "./App.css";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import SignUp from "./components/SignUp.js";
import AccountSettings from "./components/AccountSettings.js";
import Alert from "./components/Alert.js";
import Chat from "./components/Chat.js";
import NewChat from "./components/NewChat.js";
import Resources from "./components/Resources.js";
import About from "./components/About.js";
import TranscriptHistory from "./components/TranscriptHistory.js";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
    }
    
  return (
    <>
      <BrowserRouter>
        <div className="page-container">
          <div className="content-wrap">
          <Header />
          <Alert alert={alert}/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/chat" element={<Chat />} />
            <Route exact path="/new-chat" element={<NewChat />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/resources" element={<Resources />} />
            <Route exact path="/transcript-history" element={<TranscriptHistory />} />
            <Route exact path="/login" element={<Login heading="Login" showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<SignUp heading="Sign Up" showAlert={showAlert}/>} />
            <Route exact path="/account-settings" element={<AccountSettings />} />
          </Routes>
        </div>
        <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;