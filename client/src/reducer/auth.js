const authReducer = (state = { authData: null, isLoading: true }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case 'LOG_IN':
    case 'SIGN_UP':
    case 'UPDATE_PROFILE':
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data };
    case 'LOG__OUT':
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
