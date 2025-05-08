import axios from 'axios';

const API = axios.create({
  baseURL: 'https://h2s-backend-urrt.onrender.com/api/auth/',
  withCredentials: true, // required for cookies/session-based auth
});

export default API;
