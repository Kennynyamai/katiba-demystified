import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'; // Import Google OAuth

import MainSection from './components/MainSection';
import FullTextPage from './components/FullTextPage';
import SearchSection from './components/SearchSection';
import FullTextBackSection from './components/FullTextBackSection';
import SearchByChapterPage from './components/SearchByChapterPage';
import Navbar from './components/Navbar';
import UserAuthPage from './components/UserAuthPage';
import SmallScreenUserAuthPage from './components/SmallScreenUserAuthPage';

const App = () => {
  const location = useLocation();
  const [userInput, setUserInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [googleUser, setGoogleUser] = useState(null); // Store Google user data

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSearch = (input) => {
    setUserInput(input);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log('Google login success:', response);
    setGoogleUser(response);
    setIsAuthenticated(true); // Mark user as authenticated
    // Store the response in localStorage or send it to your backend if needed
    localStorage.setItem('google_token', response?.access_token);
  };

  const isSearchByChapterPage = location.pathname === '/searchbychapter';
  const isFullTextPage = location.pathname === '/full-text';
  const isAuthPage = location.pathname === '/auth';

  return (
    <div className="flex flex-col h-screen">
      {/* Always render the Navbar component */}
      <Navbar />

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
            element={
              <>
                {/* Show the regular UserAuthPage on medium and larger screens */}
                <div className="hidden md:block">
                  <UserAuthPage onLoginSuccess={handleLoginSuccess} onGoogleLoginSuccess={handleGoogleLoginSuccess} />
                </div>
                {/* Show the small-screen UserAuthPage on small screens */}
                <div className="block md:hidden">
                  <SmallScreenUserAuthPage onLoginSuccess={handleLoginSuccess} onGoogleLoginSuccess={handleGoogleLoginSuccess} />
                </div>
              </>
            }
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
