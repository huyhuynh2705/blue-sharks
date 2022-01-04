import * as api from '../api/index.js';

export const getMembers = (page) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING_MEMBER' });
    const { data } = await api.getMembers(page);
    dispatch({ type: 'GET_MEMBERS', payload: data });
  } catch {
    dispatch({ type: 'END_LOADING_MEMBER' });
  }
};
