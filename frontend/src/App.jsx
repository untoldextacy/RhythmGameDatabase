import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import ScoreForm from './components/ScoreForm';
import UploadScore from './pages/UploadScore';
import Profile from './components/Profile';

import axios from 'axios';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Instead of checking localStorage, check session with backend
    axios.get('http://localhost:5000/api/auth/check-session', {
      withCredentials: true // This sends the session cookie with the request
    })
    .then((response) => {
      setIsAuthenticated(response.data.authenticated); // Respond with authentication status
    })
    .catch(() => {
      setIsAuthenticated(false); // If error (e.g., no session), mark as not authenticated
    });
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/score" element={isAuthenticated ? <ScoreForm /> : <LoginForm setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/upload" element={isAuthenticated ? <UploadScore /> : <LoginForm setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <LoginForm setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </motion.div>
    </Router>
  );
};

export default App;
