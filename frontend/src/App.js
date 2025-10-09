import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:4000/task');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      await axios.post('http://localhost:4000/task', { title: newTask });
      setNewTask('');
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/task/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

 return (
  <div className="min-h-screen bg-blue-200 flex items-center justify-center p-4">
    <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>

      {/* Input */}
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-grow border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-gray-50 rounded-lg p-2 mb-2"
          >
            <span>{task.title}</span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No tasks yet</p>
      )}
    </div>
  </div>
);

}

export default App;
