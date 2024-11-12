import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const CompletedTasks = () => {
  const [completedTodos, setCompletedTodos] = useState([]);
  const location = useLocation();
  const uid = location.state;

  useEffect(() => {
    axios.get('/todo/completedtasks', { params: { uid } })
      .then((response) => setCompletedTodos(response.data))
      .catch((error) => console.log(error));
  }, [uid]);

  const navigate = useNavigate();

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Completed Tasks</h1>
      {
        completedTodos.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">#</th>
                  <th className="py-3 px-6 text-left">Task Name</th>
                  <th className="py-3 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {completedTodos.map((todo, index) => (
                  <tr key={todo.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                    <td className="py-3 px-6 text-left">{todo.task}</td>
                    <td className="py-3 px-6 text-left text-green-500 font-medium">{todo.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No completed tasks found.</p>
        )
      }
      <div className='flex justify-center items-center bg-blue-400 p-1 font-medium'>
        <button onClick={() => navigate('/user')}>GO BACK</button>
      </div>
    </div>
  );
}

export default CompletedTasks;
