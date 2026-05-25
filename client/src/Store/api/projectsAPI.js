import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000'
});

export const projectsAPI = {
  getAll: () => API.get('/projects'),
  
  getById: (id) => API.get(`/projects/${id}`),
  
  add: (projectData) => API.post('/projects', projectData),
  
  update: (id, projectData) => API.put(`/projects/${id}`, projectData),
  
  delete: (id) => API.delete(`/projects/${id}`)
};

export default projectsAPI;
