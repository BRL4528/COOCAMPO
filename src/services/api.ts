import axios from 'axios';

const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: 'http://localhost:3333',
  // baseURL: 'https://samasc.site',
});

export default api;
