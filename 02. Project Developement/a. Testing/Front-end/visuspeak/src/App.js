import "./App.css";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import SignUp from "./components/SignUp.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div>
          <Routes>
          <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
