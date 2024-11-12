import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import axios from 'axios';

const Todo = (props) => {

    const [todo, setTodo] = useState([]);
    const [isEdit, setIsEdit] = useState(null);
    const [editRow, setEditRow] = useState({
        id: "", task: "", status: "Todo"
    });

    console.log(todo);

    const getData = async (uid) => {
        try {
            const response = await axios.get('/todo/getdata', { params: { uid } });
            setTodo(response.data.todo);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (props.message?._id) {
            getData(props.message._id);
        }
    }, [props.message?._id]);


    const addNewRow = () => {
        setTodo([...todo, { id: Date.now(), task: "", status: "Todo" }]);
        axios.post('/todo/newrow', { data: { id: Date.now(), task: "", status: "Todo" }, uid: props.message._id })
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
    };

    const handleEditData = (e) => {
        const { name, value } = e.target;
        setEditRow(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDeleteClick = (index) => {
        console.log(todo[index]);
        const del_id = todo[index].id;
        const newTodos = todo.filter((_, idx) => idx !== index);
        setTodo(newTodos);
        axios.post('/todo/deleterow', { data: del_id, uid: props.message._id })
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
        setIsEdit(null);  
        setEditRow({ id: "", task: "", status: "Todo" });
    };

    const handleSaveData = (index) => {

        const updatedTodos = [...todo];

        updatedTodos[index] = { ...updatedTodos[index], ...editRow };

        setTodo(updatedTodos);

        axios.post('/todo/updaterow', { data: editRow, uid: props.message._id })
            .then((response) => console.log(response))
            .catch((err) => console.log(err));

        setIsEdit(null);  // Exit edit mode
        setEditRow({ id: "", task: "", status: "Todo" });  // Reset the editRow state
    };

    const handleEditClick = (index, item) => {
        setIsEdit(index);
        setEditRow(item);  // Set the current item to editRow so its values can be edited
    };

    const navigate = useNavigate();


    return (
        <div className="p-4 bg-gray-100 min-h-screen">

            <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
            <div className='flex justify-evenly'>
                <button
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    onClick={addNewRow}
                >
                    ADD NEW ROW
                </button>
                <button
                    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    onClick={() => navigate("/completedtasks", { state: { key: props.message._id } })}
                >
                    Completed Tasks
                </button>
            </div>
            {
                todo && todo.length > 0 ? (
                    <div >
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">#</th>
                                        <th className="py-3 px-6 text-left">Task Name</th>
                                        <th className="py-3 px-6 text-left">Status</th>
                                        <th className="py-3 px-6 text-center">Edit</th>
                                        <th className="py-3 px-6 text-center">Remove</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {todo.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className={`border-b border-gray-200 hover:bg-gray-100 ${item.status === "Done" ? "bg-green-400 font-medium" : "bg-orange-200 text-gray-500 font-medium"
                                                }`}
                                        >
                                            <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>

                                            {isEdit === index ? (
                                                <>
                                                    <td className="py-3 px-6 text-left">
                                                        <input
                                                            type="text"
                                                            name="task"
                                                            className="w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                                            value={editRow.task}
                                                            onChange={handleEditData}
                                                            placeholder="Enter task name"
                                                        />
                                                    </td>

                                                    <td className="py-3 px-6 text-left">
                                                        <select
                                                            name="status"
                                                            className="w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                                                            value={editRow.status}
                                                            onChange={handleEditData}
                                                        >
                                                            <option value="Todo">Todo</option>
                                                            <option value="Done">Done</option>
                                                        </select>
                                                    </td>

                                                    <td className="py-3 px-6 text-center">
                                                        <button
                                                            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                                                            onClick={() => handleSaveData(index)}
                                                        >
                                                            Save
                                                        </button>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td className="py-3 px-6 text-left">{item.task}</td>
                                                    <td className="py-3 px-6 text-left">{item.status}</td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className="flex justify-center items-center">
                                                            <MdEdit
                                                                size={20}
                                                                className="text-blue-600 cursor-pointer"
                                                                onClick={() => handleEditClick(index, item)}
                                                            />
                                                        </div>
                                                    </td>
                                                </>
                                            )}

                                            <td className="py-3 px-6 text-center">
                                                <div className="flex justify-center items-center">
                                                    <MdDelete
                                                        className="text-red-600 cursor-pointer"
                                                        size={20}
                                                        onClick={() => handleDeleteClick(index)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-lg font-semibold text-gray-600">No Todos For You</p>
                    </div>
                )
            }
        </div>
    );
};

export default Todo;
