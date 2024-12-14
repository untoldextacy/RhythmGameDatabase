import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ isAuthenticated }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-indigo-600 to-purple-800 text-white flex flex-col">
      {/* Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-8">
          Personal Sound Voltex Score Tracker
        </h1>
        <p className="text-lg md:text-xl text-center mb-6 max-w-xl">
          Submit your score and track your best progress!
        </p>

        {/* Show login/register buttons only when logged out */}
        {!isAuthenticated && (
          <div className="flex space-x-4">
            <Link to="/login" className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">
              Login
            </Link>
            <Link to="/register" className="text-white bg-green-500 px-4 py-2 rounded hover:bg-green-700">
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-gray-900 text-gray-300">
        © {new Date().getFullYear()} Your App Name. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
