import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./modules/Login.js";
import SignUp from "./modules/SignUp.js";
import Footer from "./modules/Footer.js";


import Header from "./components/Header.js";
import Home from "./components/Home.js";


import Alert from "./components/Alert.js";
import Chat from "./components/Chat.js";
import NewChat from "./components/ChatContainer.js";
import About from "./components/About.js";
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
          <div className="">
            <Header />
            <Alert alert={alert} />
            <Routes>
            <Route
                exact
                path="/login"
                element={<Login heading="Login" showAlert={showAlert} />}
              />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/chat" element={<Chat />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/resources" element={<Resources />} />

              <Route
                exact
                path="/signup"
                element={<SignUp heading="Sign Up" showAlert={showAlert} />}
              />
              <Route exact path="/newchat" element={<NewChat />} />
              <Route
                exact
                path="/aslchat"
                element={<ASLChat showAlert={showAlert} />}
              />
              <Route exact path="/history" element={<TranscriptHistory />} />
              <Route exact path="/speechtest" element={<SpeechTest />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
