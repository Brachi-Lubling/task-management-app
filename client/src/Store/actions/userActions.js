import usersAPI from '../api/usersAPI.js';
import { setUser, updateUserData, setLoading, setError, clearUser } from '../UserSlice.js';

export const fetchAllUsers = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await usersAPI.getAll();
    dispatch(setUser(response.data));
  } catch (err) {
    dispatch(setError(err.message || 'Failed to fetch users'));
  }
};

export const fetchUserById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await usersAPI.getById(id);
    dispatch(setUser(response.data));
  } catch (err) {
    dispatch(setError(err.message || 'Failed to fetch user'));
  }
};

export const addUserAction = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await usersAPI.add(userData);
    dispatch(setUser(response.data));
  } catch (err) {
    dispatch(setError(err.message || 'Failed to add user'));
  }
};

export const updateUserAction = (id, userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await usersAPI.update(id, userData);
    dispatch(updateUserData(response.data));
  } catch (err) {
    dispatch(setError(err.message || 'Failed to update user'));
  }
};

export const deleteUserAction = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await usersAPI.delete(id);
    dispatch(clearUser());
  } catch (err) {
    dispatch(setError(err.message || 'Failed to delete user'));
  }
};
