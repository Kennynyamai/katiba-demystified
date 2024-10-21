import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation for current route detection

const Navbar = () => {
  const location = useLocation(); // Get the current location

  // Check if the current path is /auth to hide the buttons
  const isAuthPage = location.pathname === '/auth';

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10">
      <div className="flex items-center">
        <span className="ml-3 text-lg font-bold text-white">Katiba Demystified</span>
      </div>
      {!isAuthPage && ( // Conditionally render the nav buttons based on the current route
        <nav className="flex space-x-4">
          {/* Link the Amendments button to the /amendments route */}
          <Link to="/amendments">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
              Amendments
            </button>
          </Link>
          <Link to="/auth">
            <button className="bg-transparent border border-white px-4 py-2 rounded hover:bg-white hover:text-black">
              Login
            </button>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
