import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/task', // backend now runs on port 4000
});

export default api;
