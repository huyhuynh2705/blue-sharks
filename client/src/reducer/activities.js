const activitiesReducer = (state = { activities: [], isLoading: true, isLoadingJoin: false, activityJoinId: '' }, action) => {
  switch (action.type) {
    case 'START_LOADING_ACTIVITIES':
      return { ...state, isLoading: true };
    case 'END_LOADING_ACTIVITIES':
      return { ...state, isLoading: false };
    case 'START_LOADING_JOIN_ACTIVITIES':
      return { ...state, isLoadingJoin: true, activityJoinId: action.payload };
    case 'END_LOADING_JOIN_ACTIVITIES':
      return { ...state, isLoadingJoin: false, activityJoinId: '' };
    case 'JOIN_ACTIVITY':
      const updatedActivity = state.activities.filter((activity) => activity._id === action.payload._id)[0];
      updatedActivity.participants = action.payload.updatedParticipants;
      return {
        ...state,
        activities: state.activities.map((activity) => (activity._id === action.payload._id ? updatedActivity : activity)),
      };
    case 'CREATE_ACTIVITY':
      return { ...state, activities: [action.payload, ...state.activities] };
    case 'DELETE_ACTIVITY':
      return { ...state, activities: state.activities.filter((activity) => activity._id !== action.payload) };
    case 'UPDATE_ACTIVITY':
      return { ...state, activities: state.activities.map((activity) => (activity._id === action.payload._id ? action.payload : activity)) };
    case 'GET_ACTIVITIES':
      return {
        ...state,
        activities: action.payload.activities,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        total: action.payload.total,
      };
    default:
      return state;
  }
};

export default activitiesReducer;
