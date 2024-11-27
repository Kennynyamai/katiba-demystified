import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const SmallScreenUserAuthPage = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
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
      password: '',
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

      if (!isSignUp) {
        localStorage.setItem('token', response.data.accessToken);
        setSuccessMessage('Login successful!');
        onLoginSuccess();
        navigate('/');
      } else {
        setSuccessMessage('Registration successful. Please log in.');
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1E2235] p-4 pt-[calc(4rem)]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-medium uppercase text-purple-500 tracking-widest text-center mb-8">
          {isSignUp ? 'Sign Up' : 'Login'}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
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
          )}
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
          <button
            type="submit"
            className="w-full bg-purple-600 text-white px-4 py-2 rounded uppercase text-sm tracking-wide transition-colors duration-200 hover:bg-purple-500"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        {errorMessage && <p className="text-red-600 mt-4 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-600 mt-4 text-center">{successMessage}</p>}
        {googleError && <p className="text-red-600 mt-2">{googleError}</p>} 

        {/* Google Login Button - Only show on Login form */}
        {!isSignUp && (
          <div className="mt-4">
           <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={handleGoogleLoginError}  // This triggers handleGoogleLoginError
                  />
          </div>
        )}

        {/* Login and Sign Up links - Reversed Conditional Rendering */}
        <div className="flex justify-between items-center mt-8 text-base">
          {isSignUp && (
            <button
              onClick={handleLogin}
              className={`underline transition-colors duration-200 text-purple-500`}
            >
              Login
            </button>
          )}
          {!isSignUp && (
            <button
              onClick={handleSignUp}
              className={`underline transition-colors duration-200 text-purple-500`}
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmallScreenUserAuthPage;
