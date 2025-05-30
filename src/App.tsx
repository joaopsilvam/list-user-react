import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import UserFormPage from './pages/UserFormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/form" element={<UserFormPage />} />
        <Route path="/form/:id" element={<UserFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
