import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000'
});

export const tasksAPI = {
  getAll: () => API.get('/tasks'),
  
  getByProject: (projectId) => API.get(`/tasks/project/${projectId}`),
  
  getById: (id) => API.get(`/tasks/${id}`),
  
  add: (taskData) => API.post('/tasks', taskData),
  
  update: (id, taskData) => API.put(`/tasks/${id}`, taskData),
  
  delete: (id) => API.delete(`/tasks/${id}`)
};

export default tasksAPI;
