import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userScore, setUserScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Instead of checking for a JWT, we check the session directly from the backend
    fetchUserScore();
  }, []);

  const fetchUserScore = async () => {
    const response = await fetch('/api/user/score', { credentials: 'include' }); // Include cookies for session

    if (response.ok) {
      const data = await response.json();
      setUserScore(data); // Save the user's score data
    } else {
      // Redirect to login page if user is not authenticated
      navigate('/login');
    }
  };

  const handleDeleteScore = async () => {
    const response = await fetch(`/api/user/score/${userScore.id}`, {
      method: 'DELETE',
      credentials: 'include', // Include cookies for session
    });

    if (response.ok) {
      setUserScore(null); // Remove the score from the UI
    } else {
      console.error('Failed to delete score');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-indigo-600 to-purple-800 text-white flex flex-col p-8">
      <h1 className="text-4xl font-bold mb-4">Profile</h1>

      {userScore ? (
        <div className="bg-white text-blue-500 p-6 rounded-md shadow-md max-w-xl w-full">
          <h2 className="text-2xl font-bold">Your Score</h2>
          <p className="text-lg mb-4">Level: {userScore.level}</p>
          <p className="text-lg mb-4">Score: {userScore.score}</p>

          <button
            onClick={handleDeleteScore}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
          >
            Delete Your Score
          </button>
        </div>
      ) : (
        <p className="text-xl">You haven't uploaded a score yet!</p>
      )}
    </div>
  );
};

export default Profile;
