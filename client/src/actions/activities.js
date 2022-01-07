import * as api from '../api/index.js';

export const getActivities = (page) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING_ACTIVITIES' });
    const { data } = await api.getActivities(page);
    dispatch({ type: 'GET_ACTIVITIES', payload: data });
    dispatch({ type: 'END_LOADING_ACTIVITIES' });
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
    dispatch({ type: 'START_LOADING_ACTIVITIES' });
    const { data } = await api.joinActivity(activityId);
    dispatch({ type: 'JOIN_ACTIVITY', payload: data });
    dispatch({ type: 'END_LOADING_ACTIVITIES' });
  } catch (error) {
    console.log('error: ', error);
  }
};
