import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend base URL
  withCredentials: true, // Allow sending cookies and credentials
});

export default api;
