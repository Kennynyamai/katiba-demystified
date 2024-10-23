import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // We'll use axios to make HTTP requests to the backend

const UserAuthPage = ({ onLoginSuccess }) => {  // Accept `onLoginSuccess` as a prop
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // For success message

  const navigate = useNavigate();
  const toggleForms = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage('');
    setSuccessMessage('');  // Reset success message when switching forms
  };

  // Handle form data change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit handler for login or sign-up
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignUp ? 'http://localhost:3001/register' : 'http://localhost:3001/login';
    
    try {
      const response = await axios.post(url, {
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      // If login is successful, store the token and notify the parent component
      if (!isSignUp) {
        localStorage.setItem('token', response.data.accessToken);
        onLoginSuccess(); // Call the function to mark the user as logged in
        navigate('/'); // Redirect to the home page
      } else {
        setSuccessMessage("Registration successful. Please log in.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Authentication failed. Please try again.');
    }
  };

  return (
    <section className="flex justify-center items-center h-screen bg-[#1E2235]">
      <div className="relative w-4/5 max-w-6xl">
        {/* Text Section */}
        <div className="flex justify-between bg-[#2B2E43] bg-opacity-85 rounded-md text-white">
          <div className="w-1/2 p-8">
            <h2 className="text-2xl mb-4">{isSignUp ? 'Already have an account?' : "Don't have an account?"}</h2>
            <p className="text-sm mb-6">
              {isSignUp ? "Log in to continue exploring constitutional amendments and more." : 
              "Join the platform and start exploring the Kenyan Constitution today."}
            </p>
            <button
              className="border border-purple-600 text-purple-500 rounded-md py-2 px-6 uppercase hover:bg-purple-600 hover:text-white"
              onClick={toggleForms}
            >
              {isSignUp ? "Login" : "Sign up"}
            </button>
          </div>
        </div>

        {/* Forms Section */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 left-8 w-1/2 bg-[#f2f2f3] rounded-md shadow-xl transition-transform duration-500 ${
            isSignUp ? '' : 'translate-x-[100%]'
          }`}
        >
          <div className="p-8">
            <h2 className="text-xl font-medium mb-6 uppercase tracking-wider text-purple-500">{isSignUp ? "Sign Up" : "Login"}</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {isSignUp && (
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border-b border-gray-500 bg-transparent py-2 px-4 text-sm text-black focus:outline-none focus:border-purple-500"
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-gray-500 bg-transparent py-2 px-4 text-sm text-black focus:outline-none focus:border-purple-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-b border-gray-500 bg-transparent py-2 px-4 text-sm text-black focus:outline-none focus:border-purple-500"
              />
              {errorMessage && <p className="text-red-600">{errorMessage}</p>}
              {successMessage && <p className="text-green-600">{successMessage}</p>}
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-purple-600 text-white py-2 px-8 rounded-md uppercase">
                  {isSignUp ? "Sign Up" : "Log In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserAuthPage;
