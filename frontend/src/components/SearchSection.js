import React, { useState } from 'react';

const SearchSection = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    if (input.trim()) {
      onSearch(input);  // Pass the user input to the parent component (App)
    }
  };

  return (
    <section className="text-center py-4 bg-gray-800 absolute bottom-0 left-0 w-full">
      <div className="inline-flex items-center">
        
        <input
          type="text"
          className="w-80 px-4 py-2 rounded-l-lg text-gray-900"
          placeholder= "What does the Constitution say about..."
          value={input}
          onChange={handleInputChange}  // Capture user input
        />
        <button onClick={handleSearch}  className="bg-purple-700 text-white px-4 py-2 rounded-r-lg">Search</button>
      </div>
      <div className="mt-4 space-x-4">
        <blockquote className="italic text-gray-300 text-center">
          "Never memorize something that you can look up." – Albert Einstein
        </blockquote>
      </div>
    </section>
  );
};

export default SearchSection;
