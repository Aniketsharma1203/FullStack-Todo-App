import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const LogIn = () => {

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const submitInfo = async (e) => {
    e.preventDefault();


    await axios.post('/login', { email: userInfo.email, password: userInfo.password })
      .then((response) => {
        console.log(response)
        if (response.data === "LoggedIn Successfully.") {
          navigate("/user");
        }
      })
      .catch(err => console.log(err));

  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={submitInfo}>
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Sign In</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            required
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            required
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

export default LogIn
