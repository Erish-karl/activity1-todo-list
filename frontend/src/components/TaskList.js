import React, { useEffect, useState } from 'react';
import api from '../api/api';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // VIEW
  const handleView = (task) => {
    setSelectedTask(task);
    setEditingTask(null);
  };

  // EDIT
  const handleEdit = (task) => {
    setEditingTask(task);
    setSelectedTask(null);
    setNewTitle(task.title);
  };

  // UPDATE (PUT)
  const handleUpdate = async () => {
    try {
      await api.put(`/${editingTask.id}`, { title: newTitle });
      alert('Task updated successfully!');
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/${id}`);
      alert('Task deleted!');
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h1>Todo List</h1>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          >
            <strong>{task.title}</strong>
            <br />
            <button onClick={() => handleView(task)} style={{ marginRight: '5px' }}>
              View
            </button>
            <button onClick={() => handleEdit(task)} style={{ marginRight: '5px' }}>
              Update
            </button>
            <button onClick={() => handleDelete(task.id)} style={{ color: 'red' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* View Section */}
      {selectedTask && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h2>View Task</h2>
          <p><strong>ID:</strong> {selectedTask.id}</p>
          <p><strong>Title:</strong> {selectedTask.title}</p>
          <button onClick={() => setSelectedTask(null)}>Close</button>
        </div>
      )}

      {/* Edit Section */}
      {editingTask && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h2>Update Task</h2>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter new title"
          />
          <br /><br />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditingTask(null)} style={{ marginLeft: '5px' }}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskList;
