import * as api from '../api/index.js';

export const getMembers = (page) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING_MEMBERS' });
    const { data } = await api.getMembers(page);
    dispatch({ type: 'GET_MEMBERS', payload: data });
    dispatch({ type: 'END_LOADING_MEMBERS' });
  } catch (error) {
    alert(error.response.data.message);
  }
};
