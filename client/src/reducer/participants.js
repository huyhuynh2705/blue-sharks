const participantsReducer = (state = { participants: [], isLoading: true }, action) => {
  switch (action.type) {
    case 'START_LOADING_PARTICIPANTS':
      return { ...state, isLoading: true };
    case 'END_LOADING_PARTICIPANTS':
      return { ...state, isLoading: false };
    case 'GET_PARTICIPANTS':
      return {
        ...state,
        participants: action.payload,
      };
    default:
      return state;
  }
};

export default participantsReducer;
