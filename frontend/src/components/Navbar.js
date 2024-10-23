import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/auth';

  // Handle logout by clearing token and redirecting to login page
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/auth'); // Redirect to login page
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10">
      <div className="flex items-center">
        <span className="ml-3 text-lg font-bold text-white">Katiba Demystified</span>
      </div>
      {!isAuthPage && ( // Conditionally render the nav buttons based on the current route
        <nav className="flex space-x-4">
          {/* Link the Amendments button to the /amendments route */}
          <Link to="/searchbychapter">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
              Search by Chapter
            </button>
          </Link>
          <Link to="/auth">
            <button 
             onClick={handleLogout}
             className="bg-transparent border border-white px-4 py-2 rounded hover:bg-white hover:text-black">
              Logout
            </button>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
