import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Todo from '../todo/Todo';

const User = () => {
  const [user, setUser] = useState({});
  const refreshTokens = Cookies.get('uid');

  useEffect(() => {
    axios.post('/user', { refreshTokens: refreshTokens })
      .then((response) => setUser(response.data))
      .catch((err) => console.log(err));
  }, [refreshTokens]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Welcome Section */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Hey {user.name}, Welcome to your TO-DO profile!</h1>
          <p className="text-gray-600 mt-2">Manage your tasks and stay organized.</p>
        </div>

        {/* Todo Component */}
        <div className="mt-6">
          <Todo message={user} />
        </div>
      </div>
    </div>
  );
};

export default User;
