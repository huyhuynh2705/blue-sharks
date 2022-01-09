import * as api from '../api/index.js';

export const getActivities = () => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING_ACTIVITIES' });
    const { data } = await api.getActivities();
    dispatch({ type: 'GET_ACTIVITIES', payload: data });
    dispatch({ type: 'END_LOADING_ACTIVITIES' });
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const getMoreActivities = (skip) => async (dispatch) => {
  try {
    const { data } = await api.getMoreActivities(skip);
    dispatch({ type: 'GET_MORE_ACTIVITIES', payload: data });
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const createActivity = (form, setNewActivity) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING_ACTIVITIES' });
    const { data } = await api.createActivity(form);
    dispatch({ type: 'CREATE_ACTIVITY', payload: data });
    setNewActivity(false);
    dispatch({ type: 'END_LOADING_ACTIVITIES' });
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const joinActivity = (activityId) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING_JOIN_ACTIVITIES', payload: activityId });
    const { data } = await api.joinActivity(activityId);
    dispatch({ type: 'JOIN_ACTIVITY', payload: data });
    dispatch({ type: 'END_LOADING_JOIN_ACTIVITIES' });
  } catch (error) {
    console.log('error: ', error);
  }
};

export const deleteActivity = (activityId) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING_ACTIVITIES' });
    const { data } = await api.deleteActivity(activityId);
    dispatch({ type: 'DELETE_ACTIVITY', payload: data });
    dispatch({ type: 'END_LOADING_ACTIVITIES' });
  } catch (error) {
    console.log('error: ', error);
  }
};

export const updateActivity = (activityId, form, setUpdateActivity) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING_ACTIVITIES' });
    const { data } = await api.updateActivity(activityId, form);
    dispatch({ type: 'UPDATE_ACTIVITY', payload: data });
    setUpdateActivity(false);
    dispatch({ type: 'END_LOADING_ACTIVITIES' });
  } catch (error) {
    console.log('error: ', error);
  }
};
