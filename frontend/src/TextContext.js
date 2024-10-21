// TextContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const TextContext = createContext();

// Create a provider component
export const TextProvider = ({ children }) => {
  const [texts, setTexts] = useState([]);

  return (
    <TextContext.Provider value={{ texts, setTexts }}>
      {children}
    </TextContext.Provider>
  );
};
