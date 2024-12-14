import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const UploadScore = () => {
  const [level, setLevel] = useState(1); // Default to 1
  const [score, setScore] = useState(0); // Default to 0
  const [rank, setRank] = useState('E');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleLevelChange = (e) => {
    const value = Math.max(1, Math.min(20, parseInt(e.target.value)));
    setLevel(value);
  };

  const handleScoreChange = (e) => {
    const value = Math.max(0, Math.min(10000000, parseInt(e.target.value)));
    setScore(value);
  };

  const submitScore = async (scoreData) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/scores/submit-score', 
        scoreData,
        { withCredentials: true } // Ensure session cookie is sent
      );
      console.log(response.data); // Log success response
      setSuccess(response.data.message); // Show success message
      setError('');  // Clear previous errors

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/'); // Adjust to the path of your home page
      }, 2000);
    } catch (error) {
      if (error.response) {
        // Check for authentication error (status 401)
        if (error.response.status === 401) {
          setError('You need to log in to submit your score.');
        } else {
          setError(error.response?.data?.error || 'Failed to submit score');
        }
      } else if (error.request) {
        // No response was received from the backend
        setError('No response from server. Please try again later.');
      } else {
        // General error
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure level is between 1 and 20
    if (level < 1 || level > 20) {
      setError('Level must be between 1 and 20.');
      return;
    }

    // Ensure score is between 0 and 10,000,000
    if (score < 0 || score > 10000000) {
      setError('Score must be between 0 and 10,000,000.');
      return;
    }

    // Submit the score data
    submitScore({ level, score, rank });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-indigo-600 to-purple-800 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-8">
        Upload Your Score
      </h1>

      {/* Score Form */}
      <div className="bg-white text-gray-900 p-6 md:p-10 rounded-lg shadow-xl w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="level" className="block text-lg font-semibold mb-2">
              Level:
            </label>
            <input
              type="number"
              id="level"
              placeholder="Enter level"
              value={level}
              onChange={handleLevelChange}
              min="1"
              max="20"
              required
              className="w-full p-3 rounded-md border border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="score" className="block text-lg font-semibold mb-2">
              Score:
            </label>
            <input
              type="number"
              id="score"
              placeholder="Enter score"
              value={score}
              onChange={handleScoreChange}
              min="0"
              max="10000000"
              required
              className="w-full p-3 rounded-md border border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="rank" className="block text-lg font-semibold mb-2">
              Rank:
            </label>
            <select
              id="rank"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300"
            >
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
          </div>

          <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded-md mt-4 w-full">
            Submit Score
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>} {/* Display error message */}
        {success && <p className="text-green-500 mt-4">{success}</p>} {/* Display success message */}
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-gray-900 text-gray-300 mt-8">
        © {new Date().getFullYear()} Your App Name. All rights reserved.
      </footer>
    </div>
  );
};

export default UploadScore;
