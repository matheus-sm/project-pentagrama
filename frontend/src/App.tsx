import React from 'react';
import Cities from './Pages/Cities/Cities';
import Login from './Pages/Login/Login';
import Report from './Pages/Report/Report';
import User from './Pages/User/User';
import District from './Pages/District/District';
import NavBar from './Components/NavBar/Navbar';

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/cities" element={<Cities />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report" element={<Report />} />
        <Route path="/user" element={<User />} />
        <Route path="/district" element={<District />} />
      </Routes>
    </Router>
  );
}

export default App;
