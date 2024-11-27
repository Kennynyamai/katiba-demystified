import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './styles.css';
import App from './App';
import { TextProvider } from './TextContext'; // Import TextProvider
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider
import reportWebVitals from './reportWebVitals';

// Ensure the environment variable is passed correctly
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}> 
      {/* Wrap the app with GoogleOAuthProvider */}
      <TextProvider> 
        {/* Wrap the entire app with TextProvider */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// For performance reporting
reportWebVitals();
