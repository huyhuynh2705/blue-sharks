import * as api from '../api/index.js';

export const logIn = (form) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const { data } = await api.logIn(form);
    dispatch({ type: 'LOG_IN', data });
    dispatch({ type: 'END_LOADING' });
    window.location.reload();
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const signUp = (form) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const { data } = await api.signUp(form);
    dispatch({ type: 'SIGN_UP', data });
    dispatch({ type: 'END_LOADING' });
    window.location.reload();
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const updateMember = (form, setEdit) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const { data } = await api.updateMember(form);
    dispatch({ type: 'UPDATE_PROFILE', data });
    dispatch({ type: 'END_LOADING' });
    setEdit(false);
  } catch (error) {
    alert(error.response.data.message);
  }
};
