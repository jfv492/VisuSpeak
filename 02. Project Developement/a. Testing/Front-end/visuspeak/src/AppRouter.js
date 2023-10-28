// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyApp from './App';
import Login from './Login';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/App" element={<MyApp />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
