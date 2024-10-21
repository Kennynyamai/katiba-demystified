import React from 'react';
import '../styles.css'; // Ensure your custom styles are here

const AmendmentsPage = () => {
  return (
    <div className="flex h-screen mt-20">
      {/* Left Sidebar */}
      <aside className="bg-gray-800 text-white w-1/5 p-4">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Menu</h2>
          <ul className="space-y-2">
            <li><a href="/" className="block text-purple-500">Home</a></li>
            <li><a href="/explore" className="block text-purple-500">Explore</a></li>
            <li><a href="/notifications" className="block text-purple-500">Notifications</a></li>
            <li><a href="/messages" className="block text-purple-500">Messages</a></li>
            <li><a href="/profile" className="block text-purple-500">Profile</a></li>
            <li><a href="/more" className="block text-purple-500">More</a></li>
          </ul>
          <button className="bg-purple-500 text-white w-full py-2 mt-4 rounded-lg">Post</button>
        </div>
      </aside>

      {/* Main Section (Middle Feed Area) */}
      <main className="bg-gray-900 text-white flex-grow p-6 overflow-y-auto">
        <div className="border border-gray-700 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-white">Amendments</h2>
          <textarea
            className="w-full bg-gray-800 text-white p-3 rounded-lg mt-4"
            placeholder="What is happening?!"
          ></textarea>
          <button className="bg-purple-500 text-white w-full py-2 mt-4 rounded-lg">Post</button>
        </div>

        {/* Sample Posts */}
        <div className="mt-8">
          <div className="border-b border-gray-700 pb-4">
            <h3 className="font-bold text-white">Miss Amazing</h3>
            <p className="text-gray-400">Huyu ametoka Kirinyaga na anaongea Kiswahili inakaa hivo?</p>
          </div>
          <div className="border-b border-gray-700 pb-4 mt-4">
            <h3 className="font-bold text-white">Elon Musk</h3>
            <p className="text-gray-400">Good arguments</p>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="bg-gray-800 text-white w-1/4 p-4">
        <div className="mb-4">
          <button className="bg-purple-500 w-full py-2 rounded-lg">Subscribe to Premium</button>
        </div>
        <div>
          <h3 className="font-bold text-white">Live on X</h3>
          <ul className="space-y-4 mt-4">
            <li className="flex justify-between text-gray-400">
              <span>Citizen TV Kenya</span>
              <span>+71.9K</span>
            </li>
            <li className="flex justify-between text-gray-400">
              <span>Reuters</span>
              <span>+8.2K</span>
            </li>
            <li className="flex justify-between text-gray-400">
              <span>NTV Kenya</span>
              <span>+1.6K</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default AmendmentsPage;
