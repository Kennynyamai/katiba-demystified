import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/auth';
  const isHomePage = location.pathname === '/';
  const isSearchByChapterPage = location.pathname === '/searchbychapter';
  const isFullTextPage = location.pathname === '/full-text';

  // Handle logout by clearing token and redirecting to login page
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/auth'); // Redirect to login page
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10">
      <div className="flex items-center">
      <span
  className="ml-3 text-base md:text-lg font-bold md:tracking-widest text-white"
  style={{
    fontFamily: "'Poppins', sans-serif",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)"
  }}
>
  Katiba Demystified
</span>

      </div>
      
      {/* Render Navbar content only if it's not the auth page */}
      {!isAuthPage && (
        <nav className="flex space-x-4">
          {/* Conditionally render the button */}
          {isSearchByChapterPage ? (
            <Link to="/">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 text-base rounded sm:px-4 sm:py-2">
                Home
              </button>
            </Link>
          ) : (
            <Link to="/searchbychapter">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 text-base rounded sm:px-4 sm:py-2">
                Search By Chapter
              </button>
            </Link>
          )}
          {/* Only show Logout button if not on the home page */}
          {!(isHomePage || isFullTextPage) && (
            <Link to="/auth">
              <button 
                onClick={handleLogout}
                className="bg-transparent-600 border border-white px-2 py-1 text-sm rounded hover:bg-white hover:text-black sm:px-4 sm:py-2 sm:text-base">
                Logout
              </button>
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
