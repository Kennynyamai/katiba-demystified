import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './styles.css';
import App from './App';
import { TextProvider } from './TextContext'; // Import TextProvider
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TextProvider> {/* Wrap the entire app with TextProvider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TextProvider>
  </React.StrictMode>
);

// For performance reporting
reportWebVitals();
