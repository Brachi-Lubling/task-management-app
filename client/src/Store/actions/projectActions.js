import projectsAPI from '../api/projectsAPI.js';
import { setProjects, addProject, removeProject, updateProject, setLoading, setError } from '../ProjectsSlice.js';

export const fetchProjects = () => async (dispatch, getState) => {
  const state = getState();
  // Only fetch if projects haven't been loaded yet
  if (state.projects.ids.length === 0 && !state.projects.loading) {
    dispatch(setLoading(true));
    try {
      const response = await projectsAPI.getAll();
      dispatch(setProjects(response.data));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError(err.message || 'Failed to fetch projects'));
    }
  }
};

export const fetchProjectById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await projectsAPI.getById(id);
    dispatch(setProjects([response.data]));
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(setError(err.message || 'Failed to fetch project'));
  }
};

export const addProjectAction = (projectData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await projectsAPI.add(projectData);
    dispatch(addProject(response.data));
    dispatch(setLoading(false));
    return response.data;
  } catch (err) {
    dispatch(setError(err.message || 'Failed to add project'));
    dispatch(setLoading(false));
    throw err;
  }
};

export const updateProjectAction = (id, projectData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await projectsAPI.update(id, projectData);
    dispatch(updateProject(response.data));
    dispatch(setLoading(false));
    return response.data;
  } catch (err) {
    dispatch(setError(err.message || 'Failed to update project'));
    dispatch(setLoading(false));
    throw err;
  }
};

export const deleteProjectAction = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await projectsAPI.delete(id);
    dispatch(removeProject(id));
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(setError(err.message || 'Failed to delete project'));
    dispatch(setLoading(false));
    throw err;
  }
};
