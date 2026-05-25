import tasksAPI from '../api/tasksAPI.js';
import { setTasks, addTask, removeTask, updateTask, setLoading, setError } from '../TasksSlice.js';

export const fetchTasks = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await tasksAPI.getAll();
    dispatch(setTasks(response.data));
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(setError(err.message || 'Failed to fetch tasks'));
    dispatch(setLoading(false));
  }
};

export const fetchTasksByProject = (projectId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    console.log('Fetching tasks for projectId:', projectId);
    const response = await tasksAPI.getByProject(projectId);
    console.log('Tasks response:', response.data);
    dispatch(setTasks(response.data));
    dispatch(setLoading(false));
  } catch (err) {
    console.error('Error fetching tasks:', err);
    dispatch(setError(err.message || 'Failed to fetch tasks'));
    dispatch(setLoading(false));
  }
};

export const fetchTaskById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await tasksAPI.getById(id);
    dispatch(setTasks([response.data]));
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(setError(err.message || 'Failed to fetch task'));
    dispatch(setLoading(false));
  }
};

export const addTaskAction = (taskData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await tasksAPI.add(taskData);
    dispatch(addTask(response.data));
    dispatch(setLoading(false));
    return response.data;
  } catch (err) {
    dispatch(setError(err.message || 'Failed to add task'));
    dispatch(setLoading(false));
    throw err;
  }
};

export const updateTaskAction = (id, taskData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await tasksAPI.update(id, taskData);
    dispatch(updateTask(response.data));
    dispatch(setLoading(false));
    return response.data;
  } catch (err) {
    dispatch(setError(err.message || 'Failed to update task'));
    dispatch(setLoading(false));
    throw err;
  }
};

export const deleteTaskAction = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await tasksAPI.delete(id);
    dispatch(removeTask(id));
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(setError(err.message || 'Failed to delete task'));
    dispatch(setLoading(false));
    throw err;
  }
};

