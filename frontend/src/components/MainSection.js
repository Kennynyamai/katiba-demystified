import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextContext } from '../TextContext';

const MainSection = ({ userInput }) => {
  const { texts, setTexts } = useContext(TextContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTexts = async () => {
      // Check if data already exists in sessionStorage for the current userInput
      const cachedData = sessionStorage.getItem(`texts-${userInput}`);
      
      if (userInput && !cachedData) {
        try {
          const response = await fetch('http://localhost:3001/relevant-texts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput }),
          });

          const result = await response.json();
          console.log(result);
          if (result.success) {
            setTexts(result.data);

            // Save the result to sessionStorage to avoid re-fetching
            sessionStorage.setItem(`texts-${userInput}`, JSON.stringify(result.data));
          }
        } catch (error) {
          console.error('Error fetching texts:', error);
        }
      } else if (cachedData) {
        // If data exists in sessionStorage, use it instead of making a request
        setTexts(JSON.parse(cachedData));
      }
    };

    fetchTexts();
  }, [userInput, setTexts]);

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    return words.length > wordLimit ? `${words.slice(0, wordLimit).join(' ')}...` : text;
  };

  const handleReadMore = (fullText) => {
    navigate('/full-text', { state: { fullText } });
  };

  return (
    <section className="flex flex-col items-center py-4 max-w-full mx-auto mt-16 mb-24 flex-grow overflow-y-auto">
      <h1 className="text-4xl font-bold text-center">Explore the Kenyan Constitution</h1>
      <p className="text-gray-400 mt-0 mb-4 text-lg text-center w-full">
        Here are the five most relevant provisions from the Kenyan Constitution based on your search query.
      </p>

      <div className="mt-6 py-8 rounded-lg bg-gray-700 w-full overflow-y-auto" style={{ maxHeight: '400px', maxWidth: '600px' }}>
        {texts.map((item, index) => (
          <div key={index} className="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mb-4 mx-auto">
            {/* Container for Chapter and Part */}
            <div className="flex justify-between">
              {/* Chapter */}
              <h6 className="text-xl font-medium text-gray-500">Chapter {item.chapter}</h6>
              {/* Part */}
              <h6 className="text-xl font-medium text-gray-500">Part {item.part}</h6>
            </div>

            {/* Title */}
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{item.title}</h5>
            {/* Subtitle */}
            <h5 className="mb-4 text-xl font-medium text-gray-500">{item.sub_title}</h5>

            {/* Truncated Text */}
            <p className="font-normal text-gray-900">{truncateText(item.text, 50)}</p>

            {/* Read More Button */}
            <button
              onClick={() => handleReadMore(item.text)}
              className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainSection;
