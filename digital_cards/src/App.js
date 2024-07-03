import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Register from './pages/Register';
import Login from './pages/Login';
import CardEditor from './pages/CardEditor';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cardeditor" element={<CardEditor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
