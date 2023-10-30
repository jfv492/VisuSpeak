import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home.js";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Header />
      <SignUp /> */}
      <BrowserRouter>
        {" "}
        {/* renamed from Router to BrowserRouter */}
        <Header />
        <Home />
        <div>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
