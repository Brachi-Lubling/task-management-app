import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000'
});

export const usersAPI = {
  getAll: () => API.get('/users'),
  
  getById: (id) => API.get(`/users/${id}`),
  
  add: (userData) => API.post('/users', userData),
  
  update: (id, userData) => API.put(`/users/${id}`, userData),
  
  delete: (id) => API.delete(`/users/${id}`)
};

export default usersAPI;
