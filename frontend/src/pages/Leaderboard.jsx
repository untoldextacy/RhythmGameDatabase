import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userScore, setUserScore] = useState(null);

  // Fetch the API URL based on environment (local or production)
  const apiUrl = process.env.REACT_APP_API_URL; // This will use the URL based on your .env settings

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Use the apiUrl variable to dynamically change between local or production URL
        const response = await axios.get(`${apiUrl}/api/scores/leaderboard`);
        console.log('Leaderboard Response', response.data);
        setLeaderboard(response.data.leaderboard);
        setUserScore(response.data.userScore); // Set the logged-in user's score
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, [apiUrl]); // Use apiUrl as a dependency to trigger re-fetch if the URL changes

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-indigo-600 to-purple-800 text-white flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">Leaderboard</h2>

      {/* Display the logged-in user's score if available */}
      {userScore && (
        <div className="bg-white text-gray-900 p-4 rounded-md shadow-md mb-4">
          <h3>Your Score:</h3>
          <p>
            {userScore.username} - Level: {userScore.level} - Score: {userScore.score} - Rank: {userScore.rank} - Song: {userScore.song}
          </p>
        </div>
      )}

      {/* Display the leaderboard */}
      <ul className="w-full max-w-xl space-y-4">
        {leaderboard.map((score, index) => (
          <li key={score._id} className="bg-white text-gray-900 p-4 rounded-md shadow-md">
            {index + 1}. {score.username} - Level: {score.level} - Score: {score.score} - Rank: {score.rank} - Song: {score.song}
          </li>
        ))}
      </ul>

      <footer className="text-center py-4 bg-gray-900 text-gray-300 mt-8">
        © {new Date().getFullYear()} Your App Name. All rights reserved.
      </footer>
    </div>
  );
};

export default Leaderboard;
