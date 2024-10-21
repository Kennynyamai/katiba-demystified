import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainSection from './components/MainSection';
import FullTextPage from './components/FullTextPage';
import SearchSection from './components/SearchSection';
import FullTextBackSection from './components/FullTextBackSection';
import AmendmentsPage from './components/AmendmentsPage';
import Navbar from './components/Navbar';
import UserAuthPage from './components/UserAuthPage';

const App = () => {
  const location = useLocation(); // Get the current route
  const [userInput, setUserInput] = useState('');

  const handleSearch = (input) => {
    setUserInput(input);
  };

  // Determine specific routes
  const isAmendmentsPage = location.pathname === '/amendments';
  const isFullTextPage = location.pathname === '/full-text';
  const isAuthPage = location.pathname === '/auth';

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <div className="flex-grow overflow-y-auto">
        <Routes>
          <Route path="/" element={<MainSection userInput={userInput} />} />
          <Route path="/full-text" element={<FullTextPage />} />
          <Route path="/amendments" element={<AmendmentsPage />} />
          <Route path="/auth" element={<UserAuthPage />} />
        </Routes>
      </div>

      {/* Render FullTextBackSection only on FullTextPage */}
      {isFullTextPage && <FullTextBackSection />}

      {/* Conditionally render SearchSection (not on AmendmentsPage, FullTextPage, or AuthPage) */}
      {!isAmendmentsPage && !isFullTextPage && !isAuthPage && (
        <SearchSection onSearch={handleSearch} />
      )}
    </div>
  );
};

export default App;
