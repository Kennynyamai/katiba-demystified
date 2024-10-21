import React, { useState } from 'react';

const UserAuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForms = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <section className="flex justify-center items-center h-screen bg-[#1E2235]">
      <div className="relative w-4/5 max-w-6xl">
        {/* Text Section */}
        <div className="flex justify-between bg-[#2B2E43] bg-opacity-85 rounded-md text-white">
          <div className="w-1/2 p-8">
            <h2 className="text-2xl mb-4">Don't have an account?</h2>
            <p className="text-sm mb-6">
              Join the platform and start exploring the Kenyan Constitution today.
            </p>
            <button
              className="border border-purple-600 text-purple-500 rounded-md py-2 px-6 uppercase hover:bg-purple-600 hover:text-white"
              onClick={toggleForms}
            >
              Sign up
            </button>
          </div>

          <div className="w-1/2 p-12">
            <h2 className="text-2xl mb-4">Have an account?</h2>
            <p className="text-sm mb-6">
              Log in to continue exploring constitutional amendments and more.
            </p>
            <button
              className="border border-purple-600 text-purple-500 rounded-md py-2 px-6 uppercase hover:bg-purple-600 hover:text-white"
              onClick={toggleForms}
            >
              Login
            </button>
          </div>
        </div>

        {/* Forms Section */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 left-8 w-1/2 bg-[#f2f2f3] rounded-md shadow-xl transition-transform duration-500 ${
            isSignUp ? '' : 'translate-x-[100%]'
          }`}
        >
          {isSignUp ? (
            <div className="p-8">
              <h2 className="text-xl font-medium mb-6 uppercase tracking-wider text-purple-500">Sign Up</h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border-b border-gray-500 bg-transparent py-2 px-4 text-sm text-white focus:outline-none focus:border-purple-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border-b border-gray-500 bg-transparent py-2 px-4 text-sm text-white focus:outline-none focus:border-purple-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border-b border-gray-500 bg-transparent py-2 px-4 text-sm text-white focus:outline-none focus:border-purple-500"
                />
                <div className="flex justify-end mt-4">
                  <button type="submit" className="bg-purple-600 text-white py-2 px-8 rounded-md uppercase">
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="p-8">
              <h2 className="text-xl font-medium mb-6 uppercase tracking-wider text-purple-500">Login</h2>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border-b border-gray-500 bg-transparent py-2 px-4 text-sm text-white focus:outline-none focus:border-purple-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border-b border-gray-500 bg-transparent py-2 px-4 text-sm text-white focus:outline-none focus:border-purple-500"
                />
                <div className="flex justify-between items-center mt-4">
                  <button type="button" className="text-sm text-gray-400 underline">
                    Forgot password?
                  </button>
                  <button type="submit" className="bg-purple-600 text-white py-2 px-8 rounded-md uppercase">
                    Log In
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserAuthPage;
