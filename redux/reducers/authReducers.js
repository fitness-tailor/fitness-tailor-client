let initialState = {
  isLoading: false,
  error: "",
  user: {},
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case "FETCH_USER_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducers;
