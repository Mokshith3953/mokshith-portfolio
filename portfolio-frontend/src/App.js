import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import Login from './components/Login';
import Admin from './components/Admin';

// 1. --- IMPORT THE CSS FILE ---
import './App.css'; 

function App() {
  return (
    // 2. --- ADD THE CLASSNAME ---
    <div className="App">
      <BrowserRouter>
        {/* Basic Navigation */}
        <nav>
          <ul>
            <li><Link to="/">Home (Public)</Link></li>
            <li><Link to="/login">Admin Login</Link></li>
            <li><Link to="/admin">Admin Panel (Private)</Link></li>
          </ul>
        </nav>

        <hr />

        {/* App Routes */}
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;