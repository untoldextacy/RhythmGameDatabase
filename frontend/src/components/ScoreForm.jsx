import React, { useState } from 'react';
import axios from 'axios'

const ScoreForm = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState('E');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/scores/submit-score',
        { level, score, rank },
        { withCredentials: true } // Ensure session cookies are sent
      );
      setSuccess(response.data.message); // Show success message
      setError('');  // Clear previous errors
    } catch (err) {
      if (err.response) {
        // Check for authentication error (status 401)
        if (err.response.status === 401) {
          setError('You need to log in to submit your score.');
        } else {
          setError(err.response?.data?.error || 'Failed to submit score');
        }
      } else if (err.request) {
        // No response was received from the backend
        setError('No response from server. Please try again later.');
      } else {
        // General error
        setError('An error occurred. Please try again.');
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Level"
        value={level}
        onChange={(e) => setLevel(Number(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Score"
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
        required
      />
      <select value={rank} onChange={(e) => setRank(e.target.value)}>
        <option value="S">S</option>
        <option value="AAA+">AAA+</option>
        <option value="AAA">AAA</option>
        <option value="AA+">AA+</option>
        <option value="AA">AA</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
      </select>
      <button type="submit">Submit Score</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default ScoreForm;
