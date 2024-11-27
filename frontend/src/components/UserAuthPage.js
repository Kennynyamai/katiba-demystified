import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'; // Import the Google login component

const UserAuthPage = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [googleError, setGoogleError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = () => {
    setIsSignUp(true);
    setErrorMessage('');
    setSuccessMessage('');
    setFormData({
      fullName: '',
      email: '',
      password: ''
    });
  };

  const handleLogin = () => {
    setIsSignUp(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignUp ? 'http://localhost:3001/register' : 'http://localhost:3001/login';

    try {
      const response = await axios.post(url, {
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);
      if (!isSignUp) {
        // Login
        localStorage.setItem('token', response.data.accessToken);
        setSuccessMessage("Login successful!");
        console.log("login succesful");
        onLoginSuccess(); // Call the function to mark the user as logged in
        navigate('/');
      } else {
        // Sign Up
        setSuccessMessage("Registration successful. Please log in.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Authentication failed. Please try again.');
    }
  };

  const handleGoogleLogin = async (response) => {
    const { credential } = response;

    try {
        const googleLoginResponse = await axios.post('http://localhost:3001/google-login', {
            googleToken: credential,  // Send the Google token here
        });

        if (googleLoginResponse.data.accessToken) {
            localStorage.setItem('token', googleLoginResponse.data.accessToken);
            onLoginSuccess();
            navigate('/');
        } else {
            setGoogleError('Failed to log in with Google. Please try again.');
        }
    } catch (error) {
        console.error('Google login error:', error);
        setGoogleError('An error occurred during Google login. Please try again later.');
    }
};

  
  

  const handleGoogleLoginError = (error) => {
    console.error('Google Login Failed: ', error);
    setGoogleError('Google login failed. Please try again later.');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#1E2235]">
      <div className="relative w-4/5 lg:flex lg:justify-between bg-[#2B2E43] bg-opacity-85 rounded-md p-6">
        <div className="flex w-full text-white p-8 space-y-4 space-x-16 relative">
          <div className="flex w-full space-x-32">
            <div className="flex flex-col space-y-4 w-3/8">
              <h2 className="text-2xl font-light">Don't have an account?</h2>
              <p className="text-sm">Learn your rights and responsibilities with ease. Simplifying Kenya's Constitution for everyone.</p>
              <button
                onClick={handleSignUp}
                className="border border-purple-600 text-purple-500 rounded px-6 py-2 text-white uppercase tracking-wide transition-colors duration-200 hover:bg-purple-600 hover:text-white"
              >
                Sign up
              </button>
            </div>

            <div className="flex flex-col space-y-4 w-3/8 ml-auto">
              <h2 className="text-2xl font-light">Have an account?</h2>
              <p className="text-sm">Welcome back! Access simplified insights into Kenya's Constitution anytime, anywhere.</p>
              <button
                onClick={handleLogin}
                className="border border-purple-600 text-purple-500 rounded px-6 py-2 text-white uppercase tracking-wide transition-colors duration-200 hover:bg-purple-600 hover:text-white"
              >
                Login
              </button>
            </div>
          </div>
        </div>

        <div
          className={`absolute top-1/2 left-6 transform -translate-y-1/2 w-1/2  bg-[#f2f2f3] rounded-md shadow-xl p-8 transition-transform duration-500 ${isSignUp ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {!isSignUp ? (
            <div>
              <h2 className="text-xl font-medium uppercase text-purple-500 tracking-widest mb-8">Login</h2>
              <form className="space-y-4 min-h-[220px]" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border-b border-gray-500 bg-transparent px-2 py-2 text-sm text-black placeholder-gray-500 outline-none focus:border-purple-500"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border-b border-gray-500 bg-transparent px-2 py-2 text-sm text-black placeholder-gray-500 outline-none focus:border-purple-500"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex justify-between items-center mt-8">
                  {/* Removed Forgot password */}
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={handleGoogleLoginError}  // This triggers handleGoogleLoginError
                  />
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-6 py-2 rounded uppercase tracking-wide transition-colors duration-200 hover:bg-purple-500"
                  >
                    Log In
                  </button>
                </div>
              </form>
              {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
              {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
              {googleError && <p className="text-red-600 mt-2">{googleError}</p>} {/* Display Google login error */}
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-medium uppercase text-purple-500 tracking-widest mb-8">Sign Up</h2>
              <form className="space-y-4 min-h-[300px]" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="w-full border-b border-gray-500 bg-transparent px-2 py-2 text-sm text-black placeholder-gray-500 outline-none focus:border-purple-500"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border-b border-gray-500 bg-transparent px-2 py-2 text-sm text-black placeholder-gray-500 outline-none focus:border-purple-500"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border-b border-gray-500 bg-transparent px-2 py-2 text-sm text-black placeholder-gray-500 outline-none focus:border-purple-500"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex justify-between items-center mt-8">
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-6 py-2 rounded uppercase tracking-wide transition-colors duration-200 hover:bg-purple-500"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
              {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAuthPage;
