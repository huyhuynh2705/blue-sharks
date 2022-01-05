const activitiesReducer = (state = { activities: [], isLoading: true, numberOfPages: 1 }, action) => {
  switch (action.type) {
    case 'START_LOADING_ACTIVITIES':
      return { ...state, isLoading: true };
    case 'END_LOADING_ACTIVITIES':
      return { ...state, isLoading: false };
    case 'GET_ACTIVITIES':
      return {
        ...state,
        members: action.payload.activities,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        total: action.payload.total,
      };
    default:
      return state;
  }
};

export default activitiesReducer;
