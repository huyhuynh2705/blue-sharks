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

export const createActivity = (form) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING_ACTIVITIES' });
    const { data } = await api.createActivity(form);
    dispatch({ type: 'CREATE_ACTIVITY', payload: data });
    dispatch({ type: 'END_LOADING_ACTIVITIES' });
  } catch (error) {
    alert(error.response.data.message);
  }
};
