import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');

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

  const startEditing = (task) => {
    setEditingTask(task.id);
    setUpdatedTitle(task.title);
  };

  const updateTask = async (id) => {
    if (!updatedTitle.trim()) return;
    try {
      await axios.patch(`http://localhost:4000/task/${id}`, { title: updatedTitle });
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 flex items-center justify-center p-6">
      <div className="bg-white/90 shadow-2xl rounded-3xl w-full max-w-3xl p-10 border border-blue-200 backdrop-blur-md">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8 drop-shadow-md">
          📝 My Todo List
        </h1>

        {/* Input */}
        <div className="flex mb-8">
          <input
            type="text"
            className="flex-grow border border-blue-400 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <button
            className="bg-blue-600 text-white px-6 text-lg font-semibold rounded-r-lg hover:bg-blue-700 transition"
            onClick={addTask}
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-blue-50 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition"
            >
              {editingTask === task.id ? (
                <input
                  type="text"
                  className="flex-grow border border-blue-400 rounded-lg px-3 py-1 mr-2"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
              ) : (
                <span className="text-lg text-gray-700 font-medium">{task.title}</span>
              )}

              <div className="flex space-x-3">
                {editingTask === task.id ? (
                  <button
                    className="text-green-600 font-semibold hover:text-green-800"
                    onClick={() => updateTask(task.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="text-blue-600 font-semibold hover:text-blue-800"
                    onClick={() => startEditing(task)}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="text-red-500 font-semibold hover:text-red-700"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="text-center text-gray-400 mt-6 text-lg italic">No tasks yet...</p>
        )}
      </div>
    </div>
  );
}

export default App;
