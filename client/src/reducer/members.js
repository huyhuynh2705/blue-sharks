const membersReducer = (state = { members: [], isLoading: true, numberOfPages: 1 }, action) => {
  switch (action.type) {
    case 'START_LOADING_MEMBERS':
      return { ...state, isLoading: true };
    case 'END_LOADING_MEMBERS':
      return { ...state, isLoading: false };
    case 'GET_MEMBERS':
      return {
        ...state,
        members: action.payload.members,
        total: action.payload.total,
      };
    case 'FILTER_MEMBERS':
      return {
        ...state,
        members: action.payload.members,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        total: action.payload.total,
      };
    default:
      return state;
  }
};

export default membersReducer;
