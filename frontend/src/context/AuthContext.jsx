// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/check-session', { withCredentials: true })
      .then((response) => {
        if (response.data.authenticated) {
          setIsAuthenticated(true);
          axios.get('http://localhost:5000/api/auth/user', { withCredentials: true })
            .then((userResponse) => setUserData(userResponse.data))
            .catch((err) => console.error('Failed to fetch user data:', err));
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error('Error checking session:', error);
        setIsAuthenticated(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
