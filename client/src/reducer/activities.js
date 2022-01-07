const activitiesReducer = (state = { activities: [], isLoading: true, numberOfPages: 1 }, action) => {
  switch (action.type) {
    case 'START_LOADING_ACTIVITIES':
      return { ...state, isLoading: true };
    case 'END_LOADING_ACTIVITIES':
      return { ...state, isLoading: false };
    case 'JOIN_ACTIVITY':
      const updatedActivity = state.activities.filter((activity) => activity._id === action.payload._id)[0];
      updatedActivity.participants = action.payload.updatedParticipants;
      return {
        ...state,
        activities: state.activities.map((activity) => (activity._id === action.payload._id ? updatedActivity : activity)),
      };
    case 'CREATE_ACTIVITY':
      return { ...state, activities: [action.payload, ...state.activities] };
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
