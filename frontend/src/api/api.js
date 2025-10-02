import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/task', // backend port mo
});

export default api;
