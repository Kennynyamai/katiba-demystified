import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Hook to access location state
import FullTextBackSection from './FullTextBackSection'; // Import the back section
import legalTerms from '../LegalTerms.json'; // Import the JSON file with legal terms

const FullTextPage = () => {
  const location = useLocation(); // Get the state passed from the MainSection
  const { fullText } = location.state || {}; // Destructure the fullText from location.state

  const [formattedText, setFormattedText] = useState(fullText);
  const [matchedTerms, setMatchedTerms] = useState([]);

  useEffect(() => {
    if (fullText) {
      // Scan fullText for any matches from legalTerms
      const foundTerms = legalTerms.legalTerms.filter((term) =>
        fullText.toLowerCase().includes(term.word.toLowerCase())
      );

      // Create a highlighted version of the fullText
      let highlighted = fullText;

      // Loop over found terms and replace them with <span> wrapped terms with Tailwind classes
      foundTerms.forEach((term) => {
        // Use a global and case-insensitive regex to find the word in the full text
        const regex = new RegExp(`\\b(${term.word})\\b`, 'gi');

        // Replace matched terms with <span class="bg-yellow-300 font-bold">word</span>
        highlighted = highlighted.replace(
          regex,
          '<span class="bg-yellow-300 font-bold">$1</span>'
        );
      });

      // Format the text for better readability (new lines and dot handling)
      let formatted = highlighted;

      // Remove leading dots at the start of the text or sentences
      formatted = formatted.replace(/^\./gm, '');

      // Add line breaks before numbers (1), (2), letters (a), (b), or dashes ---
      formatted = formatted.replace(/(\(\d+\))|(\([a-z]\))|---/g, '<br/><br/>$&');

      setFormattedText(formatted);
      setMatchedTerms(foundTerms);
    }
  }, [fullText]);

  return (
    <section className="flex flex-col items-center py-4 max-w-full mx-auto mt-16 mb-24 flex-grow overflow-y-auto">
      <h1 className="text-4xl font-bold text-center">Full Text</h1>
      <p className="text-gray-400 mt-0 mb-4 text-center w-full">
        Here's the complete text from the Constitution.
      </p>

      <div className="mt-8 md:py-8 p-4 md-p-0 rounded-lg bg-gray-700 w-full overflow-y-auto" style={{ width: '100%', maxWidth: '600px' }}>
        <div className="block max-w-lg p-2 md-p-6 bg-white border border-gray-200 rounded-lg shadow mx-auto">
          {/* Render the formatted text using dangerouslySetInnerHTML */}
          <p
            className="font-normal text-gray-900 -mt-4"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        </div>
      </div>

      {/* Display matched terms and their definitions below the full text */}
      <div className="mt-8 mb-8 py-4 w-full" style={{ maxWidth: '600px' }}>
        {matchedTerms.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-center">Legal Terms in the Text</h2>
            {matchedTerms.map((term, index) => (
              <div key={index} className="mt-4 p-4 bg-white rounded-lg shadow">
                <h3 className="text-xl font-bold text-gray-800">{term.word}</h3>
                <p className="text-gray-600">{term.definition}</p>
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-400 text-center mt-4">No legal terms found in the text.</p>
        )}
      </div>

      {/* FullTextBackSection will be rendered here */}
      <FullTextBackSection />
    </section>
  );
};

export default FullTextPage;
