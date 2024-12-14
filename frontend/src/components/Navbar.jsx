import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate(); // To navigate programmatically on logout

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the token from localStorage
    setIsAuthenticated(false);  // Update the authentication state
    navigate('/login');  // Redirect to login page after logging out
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Leaderboard</Link>
        
        <div className="flex items-center">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-white mr-4">Profile</Link>
              <Link to="/leaderboard" className="text-white mr-4">Leaderboard</Link>
              <Link to="/upload" className="text-white mr-4">Upload Score</Link>
              <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-700">
                Logout
              </button>
            </>
          ) : (
            // Navbar should not show login/register when logged out
            null
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
