// components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(
          'http://localhost:5000/api/auth/register',
          { username, password },
          { headers: { 'Content-Type': 'application/json' } }
        );
        const { token } = response.data;
        localStorage.setItem('token', token); // Store token in localStorage
        onRegister(token); // Set the token after successful registration
      } catch (err) {
        setError(err.response?.data?.message || 'Error registering user');
      }
    };
  
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Register</button>
        </form>
      </div>
    );
  };
  

export default Register;
