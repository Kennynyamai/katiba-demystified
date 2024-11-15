import React, { useState } from 'react';
import '../styles.css'; 
import axios from 'axios'; // Import axios for API requests


const SearchByChapterPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [texts, setTexts] = useState([]); // State to hold the chapter contents
  const [selectedChapter, setSelectedChapter] = useState(null); // State to track the selected chapter
  const [simplifiedText, setSimplifiedText] = useState(''); // State to hold the simplified text
  const [sub_title, setSubTitle] = useState('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const chapters = [
    { title: "SOVEREIGNTY OF THE PEOPLE AND SUPREMACY OF THIS CONSTITUTION", number: 1 },
    { title: "THE REPUBLIC", number: 2 },
    { title: "CITIZENSHIP", number: 3 },
    { title: "THE BILL OF RIGHTS", number: 4 },
    { title: "LAND AND ENVIRONMENT", number: 5 },
    { title: "LEADERSHIP AND INTEGRITY", number: 6 },
    { title: "REPRESENTATION OF THE PEOPLE", number: 7 },
    { title: "THE LEGISLATURE", number: 8 },
    { title: "THE EXECUTIVE", number: 9 },
    { title: "JUDICIARY", number: 10 },
    { title: "DEVOLVED GOVERNMENT", number: 11 },
    { title: "PUBLIC FINANCE", number: 12 },
    { title: "THE PUBLIC SERVICE", number: 13 },
    { title: "NATIONAL SECURITY", number: 14 },
    { title: "COMMISSIONS AND INDEPENDENT OFFICES", number: 15 },
    { title: "AMENDMENT OF THIS CONSTITUTION", number: 16 },
    { title: "GENERAL PROVISIONS", number: 17 },
    { title: "TRANSITIONAL AND CONSEQUENTIAL PROVISIONS", number: 18 }
  ];

  const fetchChapterContent = async (chapterNumber) => {
    try {
      const response = await axios.get(`http://localhost:3001/data/chapter/${chapterNumber}`);
      setTexts(response.data.data); // Update the texts state with the fetched data
      setSelectedChapter(chapterNumber); // Set the selected chapter
    } catch (error) {
      console.error('Error fetching chapter content:', error);
    }
  };

  const handleSimplify = async (text, sub_title) => {
    const prompt = `Simplify the following text for a high school student to understand, maintain brevity:\n\n${text}`;

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPEN_AI_KEY}`
        }
      });

      const simplifiedResponse = response.data.choices[0].message.content;
      console.log('Simplified response:', simplifiedResponse);
      setSimplifiedText(simplifiedResponse); // Update the state with the simplified text
      setSubTitle(sub_title); // Update the subtitle
    } catch (error) {
      console.error('Error simplifying text:', error);
    }
  };

  return (
    <section className="flex flex-col md:flex-row h-screen mt-10 md:mt-20 transition-all">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white md:w-1/5 w-full p-4 flex flex-col relative">
        <div className="space-y-4">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-full text-left bg-purple-600 text-white px-4 py-3 rounded-lg flex justify-between items-center transition duration-200 ease-in-out hover:bg-purple-700"
            >
              <span className="font-semibold">Select Chapter</span>
              <svg
                className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute left-0 mt-1 bg-gray-700 text-white rounded-lg shadow-lg w-full transition-all duration-200 ease-in-out z-10">
                {chapters.map((chapter, index) => (
                  <li key={index}>
                    <button
                      onClick={() => { fetchChapterContent(chapter.number); toggleDropdown(); }}
                      className="block px-4 py-2 hover:bg-gray-600 transition duration-150 ease-in-out w-full text-left"
                    >
                      {chapter.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </aside>

      <main className="bg-gray-900 text-white flex-grow p-6 overflow-y-auto">
        <div className="border border-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white">
            {selectedChapter && texts.length > 0 ? texts[0].title : 'Amendments'}
          </h2>
        </div>

        {selectedChapter && texts.length > 0 && (
          <div className="mt-6 py-8 px-6 rounded-lg bg-gray-800 w-full max-w-3xl mx-auto overflow-y-auto shadow-lg">
            {texts.map((item, index) => (
              <div key={index} className="block w-full p-4 bg-gray-200 border border-gray-300 rounded-lg shadow hover:bg-gray-300 mb-4 mx-auto">
                <div className="flex justify-between">
                  <h6 className="text-xl font-medium text-gray-600">Part {item.part}</h6>
                </div>

                <h5 className="mb-4 text-xl font-bold text-gray-800">{item.sub_title}</h5>
                <p className="font-normal text-gray-900" dangerouslySetInnerHTML={{ __html: item.text.replace(/(\n|<br\s*\/?>)/g, '<br />') }} />

                {/* Simplify Button */}
                <button
                  onClick={() => handleSimplify(item.text, item.sub_title)}
                  className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-all duration-200"
                >
                  Simplify
                </button>
              </div>
            ))}
          </div>
        )}
      </main>


      {/* Simplified Text Sidebar */}
      <aside className="bg-gray-800 text-white md:w-1/4 w-full p-4 transition-all">
        <div className="mb-4">
          <button className="bg-purple-500 w-full py-2 rounded-lg transition duration-200 hover:bg-purple-600">
            Simplified Text
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-700 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">{sub_title}</h3>
          <p className="text-gray-200 mt-2">{simplifiedText || 'Click "Simplify" to see the simplified text.'}</p>
        </div>
      </aside>
    </section>
  );
};

export default SearchByChapterPage;
