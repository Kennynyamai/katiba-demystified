import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const FullTextBackSection = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  return (
    <section className="text-center py-4 bg-gray-800 absolute bottom-0 left-0 w-full">
      <div className="mt-2 space-x-4">
        <button
          onClick={() => navigate('/')} // Navigate back to the main page
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Main Page
        </button>
      </div>
      <div className="mt-4 space-x-4">
        <blockquote className="italic text-gray-300 text-center">
          "Never memorize something that you can look up." – Albert Einstein
        </blockquote>
      </div>
    </section>
  );
};

export default FullTextBackSection;
