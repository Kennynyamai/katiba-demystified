import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import MainSection from './components/MainSection';
import FullTextPage from './components/FullTextPage';
import SearchSection from './components/SearchSection';
import FullTextBackSection from './components/FullTextBackSection';
import SearchByChapterPage from './components/SearchByChapterPage';
import Navbar from './components/Navbar';
import UserAuthPage from './components/UserAuthPage';

const App = () => {
  const location = useLocation(); // Get the current route
  const [userInput, setUserInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by checking for a token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSearch = (input) => {
    setUserInput(input);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Mark user as authenticated
  };

  const isSearchByChapterPage = location.pathname === '/searchbychapter';
  const isFullTextPage = location.pathname === '/full-text';
  const isAuthPage = location.pathname === '/auth';

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar only shown when the user is authenticated */}
      {isAuthenticated && <Navbar />}

      {/* Main content area */}
      <div className="flex-grow overflow-y-auto">
        <Routes>
          {/* Protect all routes except /auth */}
          <Route
            path="/"
            element={isAuthenticated ? <MainSection userInput={userInput} /> : <Navigate to="/auth" />}
          />
          <Route
            path="/full-text"
            element={isAuthenticated ? <FullTextPage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/searchbychapter"
            element={isAuthenticated ? <SearchByChapterPage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={<UserAuthPage onLoginSuccess={handleLoginSuccess} />}
          />
        </Routes>
      </div>

      {/* Render FullTextBackSection only on FullTextPage */}
      {isFullTextPage && isAuthenticated && <FullTextBackSection />}

      {/* Conditionally render SearchSection (not on AmendmentsPage, FullTextPage, or AuthPage) */}
      {!isSearchByChapterPage && !isFullTextPage && !isAuthPage && isAuthenticated && (
        <SearchSection onSearch={handleSearch} />
      )}
    </div>
  );
};

export default App;
