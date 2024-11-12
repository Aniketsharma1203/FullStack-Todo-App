import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const submitInfo = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:4000/", { name: userInfo.name, email: userInfo.email, password: userInfo.password })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((err) => console.log(err));

  };

  return (

    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={submitInfo}>
        <h2 className="text-3xl font-semibold mb-8 text-center text-blue-600">Sign Up</h2>

        {/* Name Input */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            required
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-200"
            placeholder="Enter your name"
          />
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            required
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-200"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-8">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            required
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-200"
            placeholder="Enter your password"
          />
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Sign Up
        </button>
      </form>

      {/* Already have an Account */}
      <div className="mt-6 flex items-center gap-2 text-gray-600">
        <span>Already have an account?</span>
        <button
          onClick={() => navigate('/login')}
          className="text-blue-600 font-semibold hover:text-blue-700 transition duration-300"
        >
          Log In
        </button>
      </div>
    </div>

  );
};

export default SignUp;
