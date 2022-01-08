import * as api from '../api/index.js';

export const getParticipants = (participantsIdArray) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING_PARTICIPANTS' });
    const { data } = await api.getParticipants(participantsIdArray);
    dispatch({ type: 'GET_PARTICIPANTS', payload: data });
    dispatch({ type: 'END_LOADING_PARTICIPANTS' });
  } catch (error) {
    alert(error.response.data.message);
  }
};
