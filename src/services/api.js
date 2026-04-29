import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.whatsup-clone.com', // Placeholder base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
