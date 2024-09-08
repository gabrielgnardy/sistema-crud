import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

instance.interceptors.response.use(
  response => response, 
  error => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/'; 
      return null;
    }
    return Promise.reject(error); 
  }
);

export default instance;
